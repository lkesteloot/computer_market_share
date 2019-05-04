
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
    csv_reader = csv.reader(open("Computer_Smartphone_tablet_markethshare_1975-2012.csv"))

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

    # Sort the data by first release.
    unreleased = set(range(1, len(header)))
    order = []
    for values in data:
        for i in range(1, len(values)):
            if i in unreleased and values[i] != 0:
                order.append(i)
                unreleased.remove(i)
    header = rearrange(header, order)
    data = [rearrange(values, order) for values in data]

    dump_data(header, data)

if __name__ == "__main__":
    main()

