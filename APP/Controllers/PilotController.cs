using APP.Data;
using APP.Models;
using Microsoft.AspNetCore.Mvc;

namespace APP.Controllers
{

    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom Pilot u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]

    public class PilotController : ControllerBase
    {
        /// <summary>
        /// Kontest za rad s bazom koji će biti postavljen s pomoću Dependecy Injection-om
        /// </summary>
        private readonly ELAContext _context;

        /// <summary>
        /// Konstruktor klase koja prima Ela kontext
        /// pomoću DI principa
        /// </summary>
        /// <param name="context"></param>
        public PilotController(ELAContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Dohvaća sve pilote iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        /// 
        /// <returns></returns>
        /// GET api/v1/Pilot
        /// 
        ///<remarks>
        ///   /// <returns>Piloti u bazi</returns>
        /// <response code="200">Sve OK, ako nema podataka content-length: 0 </response>
        /// <response code="400">Zahtjev nije valjan</response>
        /// <response code="503">Baza na koju se spajam nije dostupna</response>
        [HttpGet]
        public IActionResult Get()
        {
            // kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var piloti = _context.Piloti.ToList();
                if (piloti == null || piloti.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(piloti);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }
        /// <summary>
        /// Dodaje novog pilota u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/Pilot
        ///     {naziv: "Primjer naziva"}
        /// </remarks>
        /// <param name="pilot">Pilot za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Pilot s šifrom koju je dala baza</returns>
        [HttpPost]

            public IActionResult Post(Pilot pilot)
            {
                if (!ModelState.IsValid || pilot == null)
                {
                    return BadRequest();
                }
                try
                {
                    _context.Piloti.Add(pilot);
                    _context.SaveChanges();
                    return StatusCode(StatusCodes.Status201Created, pilot);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status503ServiceUnavailable,
                        ex.Message);
                }
            }

        /// <summary>
        /// Mijenja podatke postojećeg pilota u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/pilot/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "ime": "Novi ime",
        ///  "prezime": Novo prezime,
        ///  "broj dozvole": HR.12345,
        /// 
        ///  
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra pilota koji se mijenja</param>  
        /// <param name="pilot">Pilot za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od pilota koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi pilota kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response>
        [HttpPut]
            [Route("{sifra:int}")]
            public IActionResult Put(int sifra, Pilot pilot)
            {
                if (sifra <= 0 || !ModelState.IsValid || pilot == null)
                {
                    return BadRequest();
                }


                try
                {


                    var pilotIzBaze = _context.Piloti.Find(sifra);

                    if (pilotIzBaze == null)
                    {
                        return StatusCode(StatusCodes.Status204NoContent, sifra);
                    }


                    // inače ovo rade mapperi
                    // za sada ručno
                    pilotIzBaze.Ime = pilot.Ime;
                    pilotIzBaze.Prezime = pilot.Prezime;
                    pilotIzBaze.BrojDozvole = pilot.BrojDozvole;


                    _context.Piloti.Update(pilotIzBaze);
                    _context.SaveChanges();

                    return StatusCode(StatusCodes.Status200OK, pilotIzBaze);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status503ServiceUnavailable,
                        ex.Message);
                }


            }

        /// <summary>
        /// Briše pilota iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    DELETE api/v1/pilot/1
        ///    
        /// </remarks>
        /// <param name="sifra">Šifra pilota koji se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi pilota kojeg želimo obrisati</response>
        /// <response code="503">Problem s bazom</response> 
        [HttpDelete]
            [Route("{sifra:int}")]
            [Produces("application/json")]
            public IActionResult Delete(int sifra)
            {
                if (!ModelState.IsValid || sifra <= 0)
                {
                    return BadRequest();
                }

                try
                {
                    var pilotIzbaze = _context.Piloti.Find(sifra);

                    if (pilotIzbaze == null)
                    {
                        return StatusCode(StatusCodes.Status204NoContent, sifra);
                    }

                    _context.Piloti.Remove(pilotIzbaze);
                    _context.SaveChanges();

                    return new JsonResult("{\"poruka\": \"Obrisano\"}"); // ovo nije baš najbolja praksa ali da znake kako i to može

                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status503ServiceUnavailable,
                        ex.Message);
                }







            }
        } } 
    

