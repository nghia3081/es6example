class Class {
  static id = 0;
  constructor(name) {
    this.CId = Class.id + 1;
    Class.id+=1;
    this.name = name;
    this.students = [];
  }
  get Id() {
    return this.CId;
  }
  set Name(name) {
    this.name = name;
  }
  get Name() {
    return this.name;
  }
  set Students(students) {
    this.students = students;
  }
  get Students() {
    return this.students;
  }

}
class Student {
  static id = 0;
  constructor(name, age, gender, score) {
    this.SId = Student.id + 1;
    Student.id+=1;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.score = score;
  }
  get Name() {
    return this.name;
  }
  get Age() {
    return this.age;
  }
  get Gender() {
    return this.gender==1 ? "Male" : "Female";
  }
  get Score() {
    return this.score;
  }
  Show = () => `<tr>
  <td>${this.SId}</td>
  <td>${this.Name}</td>
  <td>${this.Age}</td>
  <td>${this.Gender}</td>
  <td>${this.Score}</td></tr>`;
}
const tableHead = `<tr><td>Id</td><td>Name</td><td>Gender</td><td>Age</td><td>Average Score</td></tr>`;
var classList = [];
showAllClass = () => {
  var classL = document.getElementById("classList");
  var content = "";
  if (classList.length == 0) content = "<option>Your school do not have any class!!</option>";
  else {
    classList.forEach((c) => (content = `${content}<option value="${c.CId}">${c.Name}</option>`));
  }
  classL.innerHTML = content;
};
selectClass = () => {
  var classL = document.getElementById("classList");
  var classSelected = classList.find((c) => c.CId == classL.value);
  var table = document.getElementById("student-list");
  var content = "";
  if (classSelected.Students.length == 0) content = `<tr><td></td><td>This class do not have any students</td><td></td><td></td><td></td></tr>`;
  else classSelected.Students.forEach((s) => (content = `${content}${s.Show()}`));
  table.innerHTML = `${tableHead}${content}<tr><button type="button" onclick="showStudentForm()">Add student</button></tr>`;
};
addClass = () => {
  var className = document.getElementById("className").value;
  if (className) {
    var classDupCheck = classList.find(c => c.name == className)
    if(classDupCheck){
        alert("Duplicate class name");
        return;
    }
    classList.push(new Class(className));
    alert("Add class successfull!!");
    showAllClass();
    document.getElementById("className").value = "";
    selectClass();
  } else {
    alert("Please enter class name");
  }
};
showStudentForm = () => {
    var form = document.getElementById("form");
    if (form.hidden) form.hidden = false;
    else {
      form.hidden = true;
      document.getElementById("studentForm").reset();
    }
  };
addStudent = () => {
  var form = document.getElementById("studentForm").elements;
  var classL = document.getElementById("classList");
  var classSelected = classList.find((c) => c.CId == classL.value);
  console.log(form.namedItem("gender").value);
  classSelected.Students.push(new Student(form[0].value, form[1].value, form.namedItem("gender").value, form.namedItem("score").value));
  showStudentForm();
  selectClass();
};
window.onload = showAllClass();
