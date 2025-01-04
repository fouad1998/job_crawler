def make_prompt(job_title, job_description):
   
   return_format = """
      ```json
         {
         	"score": float  // the score to the resume against the job description, from [0-10]
         	"value": boolean  // if the resume is qualified for the job or not
            "is_devops": boolean  // if the job is for a devops role
            "is_dev": boolean  // if the job is for a developer role
            "is_tech": boolean  // if the job is has the resume tech related
         	"explanation": string  // why the resume is fit or not for the job description
         	"fixes": string  // if not fit, explain step by step the different ways the resume can be improved for the job in a first person singular. eg. you should highlight any experience or skill..
         }
      ```
   """
    
   return f"""
         # Instruction:
         You're tasked with checking and validating resume by comparing it to the job 
         description below. Your responsibility is to strictly determine whether the resume is suitable for the job or not.

         
         # Format: 
         {return_format}

         no other explanations must be produced
         
         
         # RESUME:
         
         Étudiant en mastère spécialisé (Bac +6) à Télécom SudParis, avec plus de
         4 ans d’expérience en développement web et une expertise en gestion de
         projets agiles, j'ai joué un rôle clé dans la livraison de solutions fiables et
         performantes. Passionné par le développement backend et l’intégration
         des services cloud, je suis à la recherche d’un stage de 6 mois dès janvier.
         Mon objectif : mettre à profit mes compétences en conception de
         systèmes scalables et robustes tout en contribuant activement à
         l’innovation et à la transformation digitale de votre entreprise.
         
         
         EXPÉRIENCE PROFESSIONNELLE
         Aventique / Concepteur et développeur web et application
         Juin 2023 À Dec, Blida - Algérie (à distance)
         Gérer les autorisations des utilisateurs en fonction de leur profil.
         Migrer vers une architecture micro-frontend pour permettre la
         création de plusieurs projets au sein d'un monorepo avec NX.
         
         Namla / Ingénieur logiciel
         Avril 2023 À Juin 2023, Orsay, Île-de-France (à distance)
         Lancer des tâches Ansible à la réception des requêtes des serveurs
         backend selon un modèle de publication-abonnement (pub/sub).
         Déploiement des solutions logicielles d’une manière programmatique
         à l’aide Kubernetes.
         
         Cureety / Développeur full stack
         Février 2022 À Février 2023, Dinan, France (à distance)
         Créer des scripts utilisés lors de déploiement continue, comme la
         génération de notes de version.
         Déboguer des bugs occultes dans le code front-end ou back-end.
         
         IONIK / Développeur full stack
         Juin 2020 À Février 2022, London, UK (à distance)
         Mettre en place un système d'authentification JWT ainsi qu'un système
         spécifique pour la mise à niveau via WebSocket
         Contribuer à un service d’un caractère temps réel capable de gérer
         des milliers de connexions instantanées tout en restant stateful.
         
         FORMATION ACADÉMIQUE
         Telecom SudParis / Mastère Spécialisé en réseaux et services
         Septembre 2024 À AUJOURD'HUI, Evry, France
         
         ENSTTIC / Ingénieur en Télécommunication
         2016 À 2021, Oran, Algérie
         
         LANGUE
         FRANÇAIS - C1
         ANGLAIS - B2
         ARABE / KABYLE - NATIF
         
         COMPÉTENCES
         JavaScript/Typescript, Golang et Python
         REST API, GraphQL et gRPC
         Jira, Confluence, Asana, Git, Github, Gitlab et Figma
         Docker, Docker Swarm, Kubernetes, Jenkins, AWS, GCP et Shell Scripting
         Postgres, et Mongo
         React.js, Next.js, Apollo, Node.js, React, Testing Library, Cucumber, Gherkin, et Jest
         
         SOFT SKILLS
         Communication
         Travail d’équipe
         Adaptabilité
         Apprentissage actif
         Résolution des problèmes
         
         
         # JOB TITLE:
         {job_title}
         
         # JOB DESCRIPTION:
         {job_description}
         
         # YOUR OUTPUT:

"""