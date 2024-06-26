import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import LetService from "../../services/LetService";
import { NumericFormat } from "react-number-format";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { dohvatiPorukeAlert } from "../../services/httpService";


export default function Letovi(){
    const [letovi,setLetovi] = useState();
    let navigate = useNavigate(); 

    async function dohvatiLetove(){
        const odgovor = await LetService.get();

        if (!odgovor.ok){
            alert(dohvatiPorukeAlert(odgovor.podaci));
            return;
        }

        setLetovi(odgovor.podaci);
    }

    // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiLetove();
    }, []);

    async function obrisiLet(sifra) {
        const odgovor = await LetService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiLetove();
        } else {
            alert(dohvatiPorukeAlert(odgovor.podaci));
        }
    }

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
                        <th>Vrijeme Polijetanja</th>
                        <th>Vrijeme Slijetanja</th>
                        <th>Prelet (km)</th>
                        <th>Ime pilota</th>
                        <th>Tip zrakoplova</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {letovi && letovi.map((flight, index)=>(
                        <tr key={index}>
                            <td>{moment.utc(flight.vrijemePolijetanja).format('DD.MM.yyyy. HH:mm')}</td>
                            <td className="desno">{moment.utc(flight.vrijemeSlijetanja).format('DD.MM.yyyy. HH:mm')}</td>
                            <td className={flight.preletKm==null ? 'sredina' : 'desno'}>
                                {flight.preletKm==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                        value={flight.preletKm}
                                        displayType={'text'}
                                        thousandSeparator='.'
                                        decimalSeparator=','
                                        suffix={' km'}
                                        decimalScale={2}
                                        fixedDecimalScale
                                    />
                                }
                            </td>
                            <td className={flight.imePilota == null ? 'sredina' : 'desno'}>
                                {flight.imePilota}
                            </td>
                            <td className={flight.tipZrakoplova == null ? 'sredina' : 'desno'}>
                                {flight.tipZrakoplova}
                            </td>
                            <td className="sredina">
                                <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/letovi/${flight.sifra}`)}}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Button>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiLet(flight.sifra)}
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
