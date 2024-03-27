import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import LetService from "../../services/LetService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Letovi(){
    const [letovi,setLetovi] = useState();

    async function dohvatiLetove(){
        await LetService.get()
        .then((res)=>{
            setLetovi(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiLetove();
    },[]);

    

    return (

        <Container>
            <Link to={RoutesNames.LETOVI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Trajanje</th>   
                        <th>vrijemePolijetanja</th>
                        <th>Cijena</th>
                        <th>vrijemeSlijetanja</th>
                        <th>Upisnina</th>  
                        <th>preletkm</th>
                        <th>Verificiran</th>  
                        <th>pilot</th>
                        <th>Akcija</th>
                        <th>zrakoplov</th>
                    </tr>
                </thead>
                <tbody>
                    {letovi && letovi.map((flight, index)=>(
                        <tr key={index}>
                            <td>{flight.vrijemePolijetanja}</td>
                            <td className="desno">{flight.vrijemeSlijetanja}</td>
                            <td className={flight.preletkm==null ? 'sredina' : 'desno'}>
                                {flight.preletkm==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={flight.preletkm}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }
                            </td>
                            <td className={flight.pilot==null ? 'sredina' : 'desno'}>
                                {flight.pilot==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={flight.pilot}
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
                            </td>
                            <td className="sredina">
                                <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/smjerovi/${smjer.sifra}`)}}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Button>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiSmjer(smjer.sifra)}
                                >
                                    <FaTrash  
                                    size={25}
                                    />
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}
