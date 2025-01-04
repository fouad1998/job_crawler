def make_prompt(resume, job_title, job_description):
   return_format = """
      ```json
         {
         	"score": int  // the score to the resume against the job description, from [0-10]
         	"value": boolean  // if the resume is qualified for the job or not
            "is_devops": boolean  // if the job is for a devops role
            "is_dev": boolean  // if the job is for a developer role
            "is_tech": boolean  // if the job is has the resume programing languages or technology
            "cover_letter": string // the cover letter for the job description using the resume
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
         {resume}
         
         # JOB TITLE:
         {job_title}
         
         # JOB DESCRIPTION:
         {job_description}
         
         # YOUR OUTPUT:

"""