import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import PilotService from "../../services/ZrakoploviService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Zrakoplovi(){
    const [piloti,setZrakoplovi] = useState();

    async function dohvatiZrakoplove(){
        await ZrakoplovService.getZrakoplovi()
        .then((res)=>{
            setZrakoplovi(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiZrakoplove();
    },[]);

    function verificiran(zrakoplov){
        if (zrakoplov.verificiran==null) return 'gray';
        if(zrakoplov.verificiran) return 'green';
        return 'red';
    }

    function verificiranTitle(zrakolpov){
        if (zrakoplov.verificiran==null) return 'Nije definirano';
        if(zrakoplov.verificiran) return 'Verificiran';
        return 'NIJE verificiran';
    }



    return (

        <Container>
            <Link to={RoutesNames.ZRAKOPLOVI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>tipzrakoplova</th>
                        <th>registracija</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {zrakoplov && zrakoplovi.map((zrakoplov,index)=>(
                        <tr key={index}>
                            <td>{zrakoplov.tipzrakoplova}</td>
                            <td className="desno">{zrakoplov.registracija}</td>
                           
                
                            
                            <td className="sredina">
                            <GrValidate 
                            size={30} 
                            color={verificiran(zrakoplov)}
                            title={verificiranTitle(zrakoplov)}
                            />
                            </td>
                            <td className="sredina">
                                <Link to={RoutesNames.ZRAKOPLOV_PROMJENI}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Link>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Link>
                                    <FaTrash  
                                    size={25}
                                    />
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}