import { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import ZrakoplovService from "../../services/ZrakoplovService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";


export default function Zrakoplovi(){
    const [zrakoplovi,setZrakoplovi] = useState();
    let navigate = useNavigate(); 

    async function dohvatiZrakoplove(){
        await ZrakoplovService.get()
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



    async function obrisiZrakoplov(sifra) {
        const odgovor = await ZrakoplovService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiZrakoplove();
        } else {
          alert(odgovor.poruka);
        }
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
                        <th>Tip zrakoplova</th>
                        <th>Registracija</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {zrakoplovi && zrakoplovi.map((zrakoplov,index)=>(
                        <tr key={index}>
                            <td>{zrakoplov.tipZrakoplova}</td>
                            <td className="desno">{zrakoplov.registracija}</td>
                            
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/zrakoplovi/${zrakoplov.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiZrakoplov(zrakoplov.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}