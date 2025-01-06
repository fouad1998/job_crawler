job_updated = lambda job: print(f"""


========================================
Job: {job['title']}
Score: {job['score']}
Qualified: {job['value']}
Dev: {job['is_dev']}
Devops: {job['is_devops']}
Tech: {job['is_tech']}
========================================


""")