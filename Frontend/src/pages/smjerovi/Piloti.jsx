import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import PilotService from "../../services/PilotService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Piloti(){
    const [piloti,setPiloti] = useState();

    async function dohvatiPilote(){
        await PilotService.getPiloti()
        .then((res)=>{
            setPiloti(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiPilote();
    },[]);

    function verificiran(pilot){
        if (pilot.verificiran==null) return 'gray';
        if(pilot.verificiran) return 'green';
        return 'red';
    }

    function verificiranTitle(pilot){
        if (pilot.verificiran==null) return 'Nije definirano';
        if(pilot.verificiran) return 'Verificiran';
        return 'NIJE verificiran';
    }



    return (

        <Container>
            <Link to={RoutesNames.PILOTI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ime</th>
                        <th>prezime</th>
                        <th>brojDozvole</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {pilot && piloti.map((pilot,index)=>(
                        <tr key={index}>
                            <td>{pilot.ime}</td>
                            <td className="desno">{pilot.prezime}</td>
                            <td className={pilot.brojDozvole==null ? 'sredina' : 'desno'}>
                                {pilot.brojDozvole==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={pilot.brojDozvole}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }
                            </td>
                            
                            <td className="sredina">
                            <GrValidate 
                            size={30} 
                            color={verificiran(pilot)}
                            title={verificiranTitle(pilot)}
                            />
                            </td>
                            <td className="sredina">
                                <Link to={RoutesNames.PILOTI_PROMJENI}>
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