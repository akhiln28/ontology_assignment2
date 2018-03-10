import pandas as pd
import json

DF = pd.read_csv('cities.csv',sep=';')
print(DF.head())
cList = DF.country.unique().tolist()
cDict = {}
for ct in cList:
    tempDF = DF[ DF['country']==ct ].iloc[:,3:5]
    tempList = []
    for i in range(0,tempDF.shape[0]):
        lat = tempDF.lat.iloc[i]
        lon = tempDF.lon.iloc[i]
        tempList.append({'lat':lat,'lon':lon})
    cDict[ct] = tempList

json.dump(cDict,open("city.json","w"))
