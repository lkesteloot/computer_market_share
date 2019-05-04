
import sys
import csv

# Pick the columns we want out of the CSV file.
def splice_columns(columns):
    return columns[:11] + columns[12:13] + columns[34:36]

# Dump the table.
def dump_data(out, header, data):
    out.write("{0:5}".format(header[0]))
    for name in header[1:]:
        out.write("{0:>10}".format(name))
    out.write("\n")

    for values in data:
        out.write(str(values[0]) + " ")
        for value in values[1:]:
            out.write("{0:10}".format(value))
        out.write("\n")

# Dump the table as JavaScript.
def dump_js_data(out, header, data):
    out.write("var gComputerNames = [ ")
    for name in header[1:]:
        out.write("\"{0}\", ".format(name))
    out.write("];\n")

    out.write("var gYears = [ ")
    for values in data:
        out.write("{0}, ".format(values[0]))
    out.write("];\n")

    out.write("var gData = [\n")
    for values in data:
        out.write("    [ ")
        for value in values[1:]:
            out.write("{0}, ".format(value))
        out.write("],\n")
    out.write("];\n")

# Rearranges the column order.
def rearrange(columns, order):
    return [columns[i] for i in [0] + order]

# Replaces the entry in names.
def replace_name(names, old, new):
    new_names = [new if name == old else name for name in names]
    if new_names == names:
        sys.stderr.write("Did not find \"{0}\" in header.\n".format(old))
        sys.exit(1)

    return new_names

def main():
    csv_reader = csv.reader(open("data.csv"))

    header = csv_reader.__next__()
    header = splice_columns(header)
    header = replace_name(header, "IBM PC + clones", "PC")
    # header = replace_name(header, "Atari 400/800", "Atari")
    # header = replace_name(header, "Commodore 64", "C64")
    # header = replace_name(header, "Smartphones", "Phones")
    header[-1] = "Tablets"

    # Load the data.
    data = []
    for values in csv_reader:
        values = splice_columns(values)
        values = [int(values[0])] + [int(float(v)*1000) if v != "" else 0 for v in values[1:]]
        data.append(values)

    # Find the good order for the columns. Primary sort is the initial release date.
    # Secondary sort is death date, so we can get rid of computers sooner.
    #
    # Each element of order is (birth,death,column) tuple.
    order = []
    for column in range(1, len(header)):
        birth = None
        death = None
        for row in range(len(data)):
            if data[row][column] != 0:
                if birth is None:
                    birth = row
                death = row
        order.append( (birth, death, column) )
    order.sort()
    order = [column for (birth, death, column) in order]

    # Rearrange the columns.
    header = rearrange(header, order)
    data = [rearrange(values, order) for values in data]

    # Insert blank row first so animation looks smooth.
    data = [[data[0][0] - 1] + [0]*(len(data[0]) - 1)] + data

    dump_data(sys.stdout, header, data)
    f = open("data.js", "w")
    dump_js_data(f, header, data)
    f.close()

if __name__ == "__main__":
    if sys.version_info.major != 3:
        sys.stderr.write("Must run with Python 3.\n")
        sys.exit(1)

    main()

