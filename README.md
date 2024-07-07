# Alternox: Unlocking Affordable Health Solutions

## Project Summary
In recent times, a substantial augmentation in the digitalization of data has been experienced in the pharmaceutical sector. However, despite the evolving terrain of medical technologies, the cost of doctors’ prescribed medicines pose financial nuisance on individuals – especially those belonging to lower socioeconomic backgrounds. Over the past couple of years, this concern has become largely ostensible, especially in case of medicines produced by certain pharmaceutical companies, where the cost of medicines and other healthcare products are conspicuously higher compared to others.
In order to address the underlying concern of cost differences of vital medicines, a comprehensive web-based application, using AI and ML based smart algorithms as the core mechanism, is implemented which apprises users regarding the economical and cost-effective substitutes to their prescribed medicines, having similar chemical compositions from affordable brands.

## Novelty of the Project
The novelty of Alternox lies in its unique combination of features that distinguish it from existing solutions. It employs machine learning algorithms like K-Nearest Neighbours (k-NN) and Cosine Similarity to precisely match medications based on their chemical composition, and includes a comprehensive cost analysis which not only suggests alternatives but also highlights the price differences and potential savings for users. The user-centric interface allows users to tailor the search based on their specific needs and search parameters, making the system highly user-centric, setting a new standard in healthcare technology.

## Design Diagram
<p align="center">
  ![image](https://github.com/tasneem-98/Alternox/assets/34083800/6da2f720-0120-4133-aedb-2cf89b452445)
  <small>Figure 1:  Module-wise Design Diagram of Alternox.</small>
</p>

## Components:
1. The user account component is available to the customer on the homepage and the user can either choose to create a new account using the option to Sign up or can log into the application using an existing account through Sign in, the creadentials of which would be saved into the database system. In case of Sign in, the credentials would be verified from the database system and upon verification, the customer is granted access to the applicaton. However, user account creation is not mandatory in order to use the application.
2. The medicine browsing component is available to the user on the homepage. Through alphabetical indexing, it provides a list of alphabetical indices for the users to choose from. Each index, helps categorize the available medicines in the application using alphabetical categorization, and displays the list of medicines starting with the corresponding index alphabet.
3. The recommendation system is the core component of the application which provides the basic functionality of the proposed project. On one hand, while it is employed at data handling – cleaning the acquired dataset into an algorithimically usable and computable format, and visualizing it for convenience, the engine also manages the recommendation processing of the medicine searched by the user in order to provide its cost effective counterparts using smart AI and ML based algorithms, storing the calculated medicine recommendations into an application readable format for displaying it to the user.
4. The user navigations component comprises of all the segregated functionalities of the application through which a user can interact with the Alternox application. This component interacts with all the other comonent of the aplication in order to provide the desired functionalities to the user. These include:
- The homepage is the basic landing page with which the user accesses – with or without sign in.
-  The search helps user to search for the medicine that they need affordable alternatives for.
-   The output from the recommendation system is retrieved and is displayed to the user.
-   The medicine details page provides information pertaining to the corresponding medicine. It is accessed by the medicine browsing conponent as well as recommendation system through its recommended data retrieval.
-   The sign out allows logged in users to sign out of their accounts while allowing them to continue using the application.
5. The data component of the application is concerned with storing and providing data to the application in order to perform and maintain its functioning. The dataset comprises of all the information concerning the medicines including its basic details such as name and medicine type to chemical composition, active ingredients and prefered dosage amount. The dataset is used by the recommendation system in order to compute alternate medicine recommendations for the users. Similarly the database system is used to store all information related to user’s account including their login credentials, which is used by the user account component for authorization.

## Results
The implementation of Alternox yields significant and tangible results. Users experience a considerable cost savings on their medical expenses, allowing for better adherence to prescribed treatments without financial constraints. This increased accessibility to affordable medicines particularly benefits individuals from lower income households, leading to significantly improved health outcomes. In addition to this, by promoting the use of cost-effective medicines, the system helps to alleviate financial pressures on healthcare systems and improves their sustainability. Furthermore, the data-driven insights generated by the system offers valuable information on medicine usage patterns and preferences, aiding healthcare providers and policymakers in optimizing treatment plans.

![image](https://github.com/tasneem-98/Alternox/assets/34083800/60fc1996-faef-4efa-86cc-7b46c9dc5040)

<small> _Figure 2: Parameter based alternate medicine search through Alternox_ </small>

All in all, Alternox not only benefits individual users but also contributes to the broader goal of making healthcare more accessible and affordable for all. With a principal focus on ensuring economic viability and potency, the Alternox system not only elevates patient’s well-being but also plays a significant role in the optimization of healthcare resources and their sustainability.
