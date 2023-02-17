from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from improv_recsys import get_perfume_recommendation, perfumename_list

app = FastAPI()


origins = ["*"]

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])


@app.get('/perfume/{perfume_name}', status_code=200)
def perfume_suggestions(perfume_name):
    '''
    This function returns a JSON object of recommended perfumes
    '''
    result = get_perfume_recommendation(perfume_name)
    return result


@app.get('/perfume', status_code=200)
def perfume_autocomplete(perfume_list):
    '''
    This function returns a list of all perfume names
    '''
    result = perfumename_list
    return result
