# Herein we have the air flavourant content-based recommendation system
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
count = CountVectorizer(stop_words='english', ngram_range=(1, 5))

# reading the file
perfume = pd.read_csv("perfume.csv")


# creating a list of perfumes to be used in autocompletion
perfumename_list = perfume['perfume_name']


def create_soup(x):
    '''
    This function joins the necessary metadata into one column
    '''
    return ''.join(x['top_notes']) + ','+''.join(x['base_notes']) + ',' + ''.join(x['olfactory_family'])


perfume['soup'] = perfume.apply(create_soup,  axis=1)
# text vectorization
count_matrix = count.fit_transform(perfume['soup'])
cosine_sim2 = cosine_similarity(count_matrix, count_matrix)
perfume = perfume.reset_index()
# index mapping
indices = pd.Series(perfume.index, index=perfume['perfume_name'])
all_perfumes = [perfume['perfume_name'][i]
                for i in range(len(perfume['perfume_name']))]


def get_perfume_recommendation(perfume_name, cosine_sim=cosine_sim2):
    '''
    This function calculates the cosine similarity of target perfume 
    against all perfumes and returns the top seven perfumes and their details
    '''
    idx = indices[perfume_name]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:8]
    perfume_indices = [i[0] for i in sim_scores]
    name = perfume['perfume_name'].iloc[perfume_indices]
    top_notes = perfume['top_notes'].iloc[perfume_indices]
    base_notes = perfume['base_notes'].iloc[perfume_indices]
    brand = perfume['brand'].iloc[perfume_indices]
    olfactory_family = perfume['olfactory_family'].iloc[perfume_indices]
    gender = perfume['gender'].iloc[perfume_indices]
    result_df = pd.DataFrame(
        columns=['Name', 'Olfactory Family', 'Top Notes', 'Base Notes', 'Brand', 'Gender'])
    result_df['Name'] = name
    result_df['Olfactory Family'] = olfactory_family
    result_df['Top Notes'] = top_notes
    result_df['Base Notes'] = base_notes
    result_df['Brand'] = brand
    result_df['Gender'] = gender
    return result_df.to_dict('records')
