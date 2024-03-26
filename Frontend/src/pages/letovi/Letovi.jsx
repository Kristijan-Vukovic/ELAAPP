import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
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
        await LetService.getLetovi()
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
                    <th>Trajanje</th>   <th>vrijemePolijetanja</th>
                        <th>Cijena</th>  <th>vrijemeSlijetanja</th>
                        <th>Upisnina</th>  <th>preletkm</th>
                        <th>Verificiran</th>  <th>pilot</th>
                        <th>Akcija</th>   <th>zrakoplov</th>
                    </tr>
                </thead>
                <tbody>
                    {letovi && letovi.map((let,index)=>(
                        <tr key={index}>
                            <td>{let.vrijemePolijetanja}</td>
                            <td className="desno">{let.vrijemeSlijetanja}</td>
                            <td className={let.preletkm==null ? 'sredina' : 'desno'}>
                                {let.preletkm==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={let.preletkm}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }
                            </td>
                            <td className={let.pilot==null ? 'sredina' : 'desno'}>
                                {smjer.upisnina==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={smjer.upisnina}
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
                            color={verificiran(smjer)}
                            title={verificiranTitle(smjer)}
                            />
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
