package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

type Person struct {
   ID uint `json:"id"`
   FirstName string `json:"firstname"`
   LastName string `json:"lastname"`
   Password string `json:"password"`
   Email string `json:"email"`
}
type User struct{
    Email string `json:"email"`
    Password string `json:"password"`
}
type Questions struct{
    ID uint `json:"id"`
    Type string `json:"type"`
    QuizID string `json:"quizid"`
    Question string `json:"question"`
    OptionA string `json:"optA"`
    OptionB string `json:"optB"`
    OptionC string `json:"optC"`
    OptionD string `json:"optD"`
    AnswerA uint `json:"ansA"`
    AnswerB uint `json:"ansB"`
    AnswerC uint `json:"ansC"`
    AnswerD uint `json:"ansD"`
}
type Quiz struct{
    ID uint `json:"id"`
    Name string `json:"name"`
    Genre string `json:"genre"`
    Type string `json:"type"`
}
type Hist struct{
    ID uint `json:"id"`
    Playerid uint `json:"playerid"`
    Genre string `json:"genre"`
    QuizName string `json:"quizname"`
    Score int `json:"score"`
}
func main(){

   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()
   db.LogMode(true)
   db.AutoMigrate(&Person{})
   db.AutoMigrate(&Quiz{})
   db.AutoMigrate(&Questions{})
   db.AutoMigrate(&Hist{})
   r := gin.Default()
   r.GET("/people/", GetPeople)                             // Creating routes for each functionality
   r.GET("/people/:id", GetPerson)
   r.GET("/leader",GetLeader)
   r.GET("/leader/:genre",GetLeaderGen)
   r.POST("/people", CreatePerson)
   r.POST("/login",LoginPerson)
   r.POST("/quiz",CreateQuiz)
   r.GET("/viewquiz",ViewQuiz)
   r.POST("/hist",Histo)
   r.GET("/hist/:id",GetHist)
   r.GET("/play",ViewQuiz)
   r.GET("/getusername/:email",GetUser)
   r.GET("/getgenre/:id",GetGenre)
   r.POST("/editquiz/:id",EditQues)
   r.GET("/showques/:id",ShowQues)
   r.GET("/play/:id",Play)
   r.GET("/getname/:id",GetQuiz)
   r.PUT("/people/:id", UpdatePerson)
   r.DELETE("/viewquiz/:id",DeleteQuiz)
   r.DELETE("/people/:id", DeletePerson)
   r.DELETE("/ques/:id",DeleteQues)
   r.POST("/viewquiz/:id",AddQuestion)
   r.Use((cors.Default()))
   r.Run(":8080")                                           // Run on port 8080
} 
func GetLeader(c *gin.Context){
    var hist []Hist
    if err := db.Order("score desc").Find(&hist).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    } else {
       c.Header("access-control-allow-origin", "*") // Why am I doing this? 
       c.JSON(200, hist)
    }
}
func GetLeaderGen(c *gin.Context){
    genre := c.Params.ByName("genre")    
    var hist []Hist
    if err := db.Where("genre = ?",genre).Order("score desc").Find(&hist).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    } else {
       c.Header("access-control-allow-origin", "*") // Why am I doing this? 
       c.JSON(200, hist)
    }
}
func GetGenre(c *gin.Context){
    id := c.Params.ByName("id")
    var quiz Quiz
    if err := db.Where("id = ?",id).Find(&quiz).Error; err!=nil {
        c.AbortWithStatus(404)
        fmt.Println(err)
    } else {
        c.Header("access-control-allow-origin", "*") // Why am I doing this?
        c.JSON(200, quiz)
    }
}
func GetUser(c *gin.Context){
    email := c.Params.ByName("email")
    var person Person
    if err := db.Where("email = ?",email).Find(&person).Error; err!=nil {
        c.AbortWithStatus(404)
        fmt.Println(err)
    } else {
        c.Header("access-control-allow-origin", "*") // Why am I doing this?
        c.JSON(200, person)
    }
}
func EditQues(c *gin.Context){
    id := c.Params.ByName("id")
    var question Questions
    if err := db.Where("id = ?", id).First(&question).Error; err != nil {
        c.AbortWithStatus(404)
        fmt.Println(err)
    } else {
        c.BindJSON(&question)
        db.Save(&question)
        c.Header("access-control-allow-origin", "*") // Why am I doing this?
        c.JSON(200, question)
    }
}
func ShowQues(c *gin.Context){
    id := c.Params.ByName("id")
    var question Questions
    if err := db.Where("id = ?",id).First(&question).Error; err!=nil {
        c.AbortWithStatus(404)
        fmt.Println(err)
    } else {
        c.Header("access-control-allow-origin", "*") // Why am I doing this?
        c.JSON(200, question)
    }

}
func DeleteQues(c *gin.Context){
   id := c.Params.ByName("id")
   var question Questions
   d := db.Where("id = ?", id).Delete(&question)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func GetHist(c *gin.Context){
    id := c.Params.ByName("id")
    var hist []Hist
    if err := db.Where("playerid = ?",id).Find(&hist).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    } else {
       c.Header("access-control-allow-origin", "*") // Why am I doing this? 
       c.JSON(200, hist)
    }
}
func Histo(c *gin.Context){
    var hist Hist
    c.BindJSON(&hist)
    db.Create(&hist)
    c.Header("access-control-allow-origin", "*") // Why am I doing this?
    c.JSON(200, hist)
}
func GetQuiz(c *gin.Context){
    id := c.Params.ByName("id")
    var quiz Quiz
    if err := db.Where("id = ?",id).Find(&quiz).Error; err!=nil {
        c.AbortWithStatus(404)
        fmt.Println(err)
    } else {
        c.Header("access-control-allow-origin", "*") // Why am I doing this?
        c.JSON(200, quiz)
    }
}
func CurrHisto(c *gin.Context){
    id := c.Params.ByName("id")
    var hists []Hist
    if err := db.Where("playerid = ?",id).Find(&hists).Error; err!=nil {
        c.AbortWithStatus(404)
        fmt.Println(err)
    } else {
        c.Header("access-control-allow-origin", "*") // Why am I doing this?
        c.JSON(200, hists)
    }

}
func LoginPerson(c *gin.Context){
    var person Person
    c.BindJSON(&person)
    if err := db.Where("email = ? AND password = ?", person.Email,person.Password).First(&person).Error; err != nil {
        c.AbortWithStatus(404)
        fmt.Println(err)
        } else {
        c.Header("access-control-allow-origin", "*") // Why am I doing this?
        c.JSON(200, person)
     }
}
func Play(c *gin.Context){
    id := c.Params.ByName("id")
    var questions []Questions
    if err := db.Where("quiz_id = ?",id).Find(&questions).Error; err!=nil {
        c.AbortWithStatus(404)
        fmt.Println(err)
     } else {
        c.Header("access-control-allow-origin", "*") // Why am I doing this? 
        c.JSON(200, questions)
     }

}
func AddQuestion(c *gin.Context){
    var question Questions
    c.BindJSON(&question)
    db.Create(&question)
    c.Header("access-control-allow-origin", "*") // Why am I doing this?
    c.JSON(200, question)
}

func ViewQuiz(c *gin.Context) {
    var quizzes []Quiz
    if err := db.Find(&quizzes).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    } else {
       c.Header("access-control-allow-origin", "*") // Why am I doing this? 
       c.JSON(200, quizzes)
    }
 }
 func DeleteQuiz(c *gin.Context) {
    id := c.Params.ByName("id")
    var quiz Quiz
    d := db.Where("id = ?", id).Delete(&quiz)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"id #" + id: "deleted"})
 }
func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
   var person Person
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}
func CreateQuiz(c *gin.Context) {
    var quiz Quiz
    c.BindJSON(&quiz)
    db.Create(&quiz)
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200, quiz)
 }
func CreatePerson(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   db.Create(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func GetPerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, person)
   }
}

func GetPeople(c *gin.Context) {
   var people []Person
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, people)
   }
}
