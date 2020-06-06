from flask import Flask, request, jsonify
import json
import os
import random
import pandas as pd

app = Flask(__name__)

# get list of uids
def getGeneInfoList():
    print("connected to flask server")
    geneInfo = os.abspath("../database/preprocessing/gene_information.csv")
    geneInfoDf = pd.read_csv(geneInfo)
    uidList = list(df["uid"].astype("int").values)
    return uidList


# variables in <..>'s are provided by url and used in handling of endpoint
# pretty sure for both go/python order matters in function definition
@app.route("/api/queryFlask/<text>/<type>/<species>/<maxRes>/", methods=["GET", "POST"])
def queryByText(text, type, species, maxRes):
    geneInfoList = getGeneInfoList()
    uidResList = geneInfoList[0 : int(maxRes)]
    uidResList = [int(i) for i in uidResList]
    res = {"uidList": uidResList}
    print("Retreived uid list!, Printing:")
    print(res)
    return jsonify(res)
