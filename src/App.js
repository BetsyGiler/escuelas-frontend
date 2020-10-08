import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AppRoute from './AppRoute';
import StandardLayout from './layouts/Standard';
import AdminLayout from './layouts/AdminLayout';
import Page404 from './pages/Page404';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetails';
import StudentsPage from './pages/StudentsPage';
import CreateCourse from './pages/CreateCourse';
import CreateStudent from './pages/CreateStudent';
import CreateParallelPage from './pages/CreateParallePage';
import ProfessorsPage from './pages/ProfessorsPage';
import CreateProfessor from './pages/CreateProfessor';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AppRoute exact path="/" component={Dashboard} layout={StandardLayout}/>
        <AppRoute exact path="/login" component={Login} layout={StandardLayout}/>
        <AppRoute exact path="/admin" component={AdminPage} layout={AdminLayout}/>
        <AppRoute exact path="/admin/cursos" component={CoursesPage} layout={AdminLayout}/>
        <AppRoute exact path="/admin/curso/nuevo" component={CreateCourse} layout={AdminLayout}/>
        <AppRoute exact path="/admin/cursos/:id" component={CourseDetailsPage} layout={AdminLayout}/>
        <AppRoute exact path="/admin/cursos/:id/nuevoParalelo" component={CreateParallelPage} layout={AdminLayout}/>
        <AppRoute exact path="/admin/estudiantes" component={StudentsPage} layout={AdminLayout}/>
        <AppRoute exact path="/admin/estudiantes/nuevo" component={CreateStudent} layout={AdminLayout}/>
        <AppRoute exact path="/admin/profesores" component={ProfessorsPage} layout={AdminLayout}/>
        <AppRoute exact path="/admin/profesores/nuevo" component={CreateProfessor} layout={AdminLayout}/>
        <Route exact path="/404" component={Page404} />
        <Redirect path="*" to="/404" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
