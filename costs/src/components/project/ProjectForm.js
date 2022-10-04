import { useEffect, useState } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm ({ handleSubmit, btnText, projectData }) {
    
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
        setCategories(data);
        })
        .catch((err) => console.log(err))
        }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    }
    
    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value});
        console.log(project);
    }

    function handleCategory(e) {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input handleOnChange={handleChange} value={project.name ? project.name : ''} type='text' text='nome do projeto' name='name' placeholder='insira o nome do projeto' />
            <Input handleOnChange={handleChange} value={project.budget ? project.budget : ''} type='text' text='orçamento total' name='budget' placeholder='insira o orçamento total' />
            <Select value={project.category ? project.category.id : ''} handleOnChange={handleCategory} name='category_id' text='selecione a categoria' options={categories} />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm