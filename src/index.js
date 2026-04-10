import "./styles.css";
import Library from "./projects.js"

const library = new Library()
library.addProject("proyecto1")
library.addTodo(library.getProjects()[1].id, "titulo", "desc", "2026-03-29", 4)
console.log(library.getProjects())