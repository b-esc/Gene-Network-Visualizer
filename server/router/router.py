from flask import Flask, request, jsonify
import json
import os
import random
import pandas as pd

app = Flask(__name__)


def getGeneInfoDf():
    print("connected to flask server")
    geneInfo = os.abspath("../database/preprocessing/gene_information.csv")
    geneInfoDf = pd.read_csv(geneInfo)
    randomUidList = list(df["uid"].astype("int").values)
    return randomUidList


@app.route("/api/queryFlask/<text>/<type>/<species>/<maxRes>/", methods=["GET", "POST"])
def queryByText(text, type, species, maxRes):
    geneInfoDf = getGeneInfoDf()
    uidResList = geneInfoDf[0 : int(maxRes)]
    uidResList = [int(i) for i in idResList]
    res = {"uidList": uidResList}
    print("Retreived uid list!, Printing:")
    print(res)
    return jsonify(res)
