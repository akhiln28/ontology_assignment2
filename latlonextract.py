import csv

filename = "worldcitiespop.txt"
rows = []
fields = []
with open(filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    fields = csvreader.next()
    
print(fields)