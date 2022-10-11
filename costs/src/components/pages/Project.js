import styles from './Project.module.css';

import { parse, v4 as uuidv4} from 'uuid';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project() {
    const { id } = useParams();
    
    const [project, setProject] = useState({});
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [showServiceForm, setShowServiceForm] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
        })

        .catch((error) => console.log(error))
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function removeService(id, cost) {

        const servicesUpdated = project.services.filter((service) => service.id !== id);

        const projectUpdated = project;

        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated);
        })
        .catch((err) => console.log(err))

    }

    function createService(project) {
        setMessage('');
        
        const lastService = project.services[project.services.length - 1];
        
        lastService.id = uuidv4();
        
        const lastServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço');
            setType('error');
            project.services.pop();
            return false
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setShowServiceForm(false);
        })
        .catch(err => console.log(err))
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    function editPost(project) {
        setMessage('');
        
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto');
            setType('error');
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((res) => res.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(false);
            setMessage('Projeto alterado com sucesso');
            setType('success');
        })
        .catch((error) => console.log(error))
    }
    return (<>
        {project.name ? (
        <div className={styles.project_details}>
            <Container customClass='column'>
                {message && <Message type={type} msg={message} />}
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
                {!showProjectForm ? (
                    <div className={styles.project_info}>
                        <p>
                        <span>Categoria:</span> {project.category.name}
                        </p>
                        <p>
                        <span>Orçamento:</span> R${project.budget}
                        </p>
                        <p>
                        <span>Total utilizado:</span> R${project.cost}
                        </p>
                    </div>
                ) : (
                    <div className={styles.project_info}>
                        <ProjectForm handleSubmit={editPost} btnText='Enviar' projectData={project}/>
                    </div>
                )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adicione um serviço:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                        {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm && (
                            <ServiceForm 
                                handleSubmit={createService}
                                btnText='Adicionar serviço'
                                projectData={project}
                            />
                            // adicionar service form
                        ) }
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass='start'>
                    {project.services.length > 0 && (
                        project.services.map((service) => (
                            <ServiceCard 
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}
                            />
                        ))
                    )}
                    {project.services.length === 0 && <p>Não há serviços cadastrados</p>}
                </Container>
            </Container>
        </div>
       ) : <Loading />}
    </>)
}

export default Project