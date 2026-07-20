# 🎤 HireMatch Interview Questions

> [!NOTE]
> This document contains common technical interview questions based on the architecture, implementation, deployment, and engineering decisions made while building HireMatch. It serves as a quick revision guide before interviews.

---

# 🏗️ System Design

### Q1. Explain the architecture of HireMatch.

### Q2. Walk me through the complete request lifecycle.

### Q3. Why did you choose a layered architecture?

### Q4. How does your frontend communicate with the backend?

### Q5. Why did you separate frontend and backend?

---

# 🔐 Authentication

### Q6. Why JWT instead of Session Authentication?

### Q7. Why store JWT inside HTTP-only Cookies?

### Q8. How are protected routes implemented?

### Q9. How does authentication persist after refreshing the browser?

### Q10. How do you prevent unauthorized API access?

---

# 📄 Resume Processing

### Q11. Explain the complete resume processing pipeline.

### Q12. Why do you extract text before uploading the PDF to AWS S3?

### Q13. Why do you clean resume text before sending it to the AI?

### Q14. Why store extracted text inside MongoDB?

### Q15. Why store the original PDF in AWS S3 instead of MongoDB?

---

# 🤖 AI

### Q16. Why did you choose Groq?

### Q17. How does the AI analysis work?

### Q18. How did you ensure the AI always returns valid JSON?

### Q19. How would you improve ATS scoring accuracy?

### Q20. What happens if the AI service is unavailable?

---

# 🗄️ Database

### Q21. Explain your MongoDB schema.

### Q22. Describe the relationship between Users and Resumes.

### Q23. Why use MongoDB instead of SQL?

### Q24. Why save AI analysis instead of regenerating it every time?

---

# 🐳 Docker

### Q25. Why Docker?

### Q26. Why separate frontend and backend into different containers?

### Q27. Explain your Docker Compose configuration.

### Q28. How do the containers communicate?

### Q29. Why expose Docker ports only to localhost?

---

# 🌐 Nginx

### Q30. What is a Reverse Proxy?

### Q31. Why did you use Nginx?

### Q32. How does Nginx route requests?

### Q33. What is SSL Termination?

### Q34. Why shouldn't Express be publicly exposed?

---

# 🔒 HTTPS

### Q35. How did you configure HTTPS?

### Q36. What is Let's Encrypt?

### Q37. What is Certbot?

### Q38. How are SSL certificates renewed?

---

# ☁️ AWS

### Q39. Why AWS EC2?

### Q40. Why Elastic IP?

### Q41. Why AWS S3?

### Q42. What are Security Groups?

### Q43. Explain your production deployment.

---

# 🛡️ Security

### Q44. How do you secure passwords?

### Q45. Why use bcrypt?

### Q46. What security measures have you implemented?

### Q47. Explain your rate limiting implementation.

### Q48. Why keep secrets inside environment variables?

---

# 🚀 Deployment

### Q49. Explain your deployment process.

### Q50. What role does Docker play in deployment?

### Q51. How does Nginx interact with Docker?

### Q52. How does DNS reach your application?

### Q53. How would you deploy a new version?

---

# 🐛 Debugging

### Q54. What was the hardest bug you solved?

### Q55. Explain the localhost issue after deployment.

### Q56. How did you fix SSH timeout issues?

### Q57. Explain the DNS conflict you encountered.

### Q58. Why wasn't HTTPS working initially?

---

# 📈 Scalability

### Q59. How would you scale HireMatch to 100,000 users?

### Q60. What would you improve if this became a commercial product?

---

# 🎯 Personal Reflection

### Q61. What was the biggest lesson from this project?

### Q62. Which feature are you most proud of?

### Q63. If you rebuilt HireMatch today, what would you change?

### Q64. Why should we hire you based on this project?

---

# 💡 Final Tip

Don't memorize answers.

Understand the engineering decisions behind every component. If you can explain *why* each technology was chosen, you'll be able to confidently answer follow-up questions and adapt your responses to different interview scenarios.