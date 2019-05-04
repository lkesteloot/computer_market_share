
import sys
import csv

def splice_columns(columns):
    return columns[:11] + columns[12:13] + columns[34:36]

def dump_data(header, data):
    sys.stdout.write("{0:5}".format(header[0]))
    for name in header[1:]:
        sys.stdout.write("{0:>10}".format(name))
    sys.stdout.write("\n")

    for values in data:
        sys.stdout.write(str(values[0]) + " ")
        for value in values[1:]:
            sys.stdout.write("{0:10}".format(value))
        sys.stdout.write("\n")

def rearrange(columns, order):
    # Keep year at the front.
    new_columns = [columns[0]]

    for i in order:
        new_columns.append(columns[i])

    return new_columns

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
    header = replace_name(header, "Atari 400/800", "Atari")
    header = replace_name(header, "Commodore 64", "C64")
    header = replace_name(header, "Smartphones", "Phones")
    header[-1] = "Tablets"

    # Load the data.
    data = []
    for values in csv_reader:
        values = splice_columns(values)
        values = values[:1] + [int(float(v)*1000) if v != "" else 0 for v in values[1:]]
        data.append(values)

    # Find the good order for the columns. Primary sort is the initial release date.
    # Secondary sort is (reverse) death date, so we can get rid of computers sooner.
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

    dump_data(header, data)

if __name__ == "__main__":
    if sys.version_info.major != 3:
        sys.stderr.write("Must run with Python 3.\n")
        sys.exit(1)

    main()

