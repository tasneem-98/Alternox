import pickle
from sklearn.metrics.pairwise import cosine_similarity # Compute cosine similarity
import pandas as pd 
class Model:
    def __init__(self) -> None:
        pass

    #load the recommendation engine file
    def load_model(self, filename):
        with open(filename, 'rb') as file:
            #get the recommended data in vector form
            tfidf_matrix, tfidf_vectorizer = pickle.load(file)
        return tfidf_matrix, tfidf_vectorizer

    # Function to get recommendations
    def get_recommendations(self, user_input, df, tfidf_matrix, tfidf_vectorizer):
        # Transform the user input using the TF-IDF vectorizer
        input_tfidf = tfidf_vectorizer.transform([user_input])

        # Calculate cosine similarity between the input and all items
        similarity_scores = cosine_similarity(input_tfidf, tfidf_matrix)

        # Get indices of top recommendations
        top_indices = similarity_scores.argsort()[0][::-1][:12]  # Select top 10 recommendations

        # Get recommended items with similarity scores
        recommendations = df.iloc[top_indices]
        similarity_percentage = similarity_scores[0][top_indices] * 100

        # Add similarity percentage to recommendations
        recommendations['similarity_percentage'] = similarity_percentage

        return recommendations
    
    #make recommendations based on user input. this is the main function that is makes recommedations
    def predict(self, user_input):
        df = pd.read_csv('medicine.csv', encoding = "utf-8")
        tfidf_matrix, tfidf_vectorizer = self.load_model('recommendation_model.pkl')
        recommendations = self.get_recommendations(user_input, df, tfidf_matrix, tfidf_vectorizer)

        return recommendations
    
    #function used only for alphabetical browsing
    def filter_values(self, user_input):
        df = pd.read_csv('medicine.csv', encoding = "utf-8")
        df = df.rename(columns={'brand name': 'brand_name', 'dosage form': 'dosage_form', 'mg_ml': 'mg_ml'})
        df = df[df['brand_name'].str.startswith(user_input)]
        return df

