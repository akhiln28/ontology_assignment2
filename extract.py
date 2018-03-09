import pandas as pd
import numpy as np
import json

DF = pd.read_csv("coutry.txt",sep=";")

df2 = DF[["ISO3166A2","maxlatitude","minlatitude","maxlongitude","minlongitude"]]

# dict = df2.to_dict()

dict2 = {}
for i in range(0,df2.shape[0]):
    tempDict = {"maxlatitude":df2.iloc[i]["maxlatitude"],"minlatitude":df2.iloc[i]["minlatitude"],"maxlongitude":df2.iloc[i]["maxlongitude"],"minlongitude":df2.iloc[i]["minlongitude"]  }
    dict2[str(df2.iloc[i][0])] = tempDict

# print(dict2)
json.dump(dict2,open("out.json","w"))
