using APP.Data;
using APP.Models;
using Microsoft.AspNetCore.Mvc;

namespace APP.Controllers
{

    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom Zrakoplov u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]

    public class ZrakoplovController : ControllerBase
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
        public ZrakoplovController(ELAContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Dohvaća sve zrakoplove iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        /// 
        /// <returns></returns>
        /// GET api/v1/Zrakoplov
        /// 
        ///<remarks>
        ///   /// <returns>Zrakoplovi u bazi</returns>
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
                var zrakoplov = _context.Zrakoplovi.ToList();
                if (zrakoplov == null || zrakoplov.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(zrakoplov);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }

        /// <summary>
        /// Dohvaća zrakoplov sa traženom šifrom iz baze
        /// </summary>
        /// <param name="sifra">Šifra zrakoplova</param>
        /// <returns></returns>
        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            // kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var zrakoplov = _context.Zrakoplovi.Find(sifra);
                if (zrakoplov == null)
                {
                    return BadRequest($"Ne postoji zrakoplov sa šifrom {sifra} u bazi");
                }
                return new JsonResult(zrakoplov);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Dodaje novi zrakoplov u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/Zrakoplov
        ///     {naziv: "Primjer naziva"}
        /// </remarks>
        /// <param name="zrakoplov">Zrakoplov za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Zrakoplov s šifrom koju je dala baza</returns>
        [HttpPost]

        public IActionResult Post(Zrakoplov zrakoplov)
        {
            if (!ModelState.IsValid || zrakoplov == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Zrakoplovi.Add(zrakoplov);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, zrakoplov);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }
        /// <summary>
        /// Mijenja podatke postojećeg zrakoplova u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/zrakoplov/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "tipzrakoplova": "Novi naziv",
        ///  "registracija": 9A-GAK,
        ///  
        ///  
        ///  
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra zrakoplova koji se mijenja</param>  
        /// <param name="zrakoplov">Zrakoplov za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od Zrakoplova koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi zrakolova kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Zrakoplov zrakoplov)
        {
            if (sifra <= 0 || !ModelState.IsValid || zrakoplov == null)
            {
                return BadRequest();
            }


            try
            {


                var zrakoplovIzBaze = _context.Zrakoplovi.Find(sifra);

                if (zrakoplovIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }


                // inače ovo rade mapperi
                // za sada ručno
                zrakoplovIzBaze.TipZrakoplova = zrakoplov.TipZrakoplova;
                zrakoplovIzBaze.Registracija = zrakoplov.Registracija;
                


                _context.Zrakoplovi.Update(zrakoplovIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, zrakoplovIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }


        }
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
                var zrakoplovIzbaze = _context.Zrakoplovi.Find(sifra);

                if (zrakoplovIzbaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Zrakoplovi.Remove(zrakoplovIzbaze);
                _context.SaveChanges();

                return new JsonResult("{\"poruka\": \"Obrisano\"}"); // ovo nije baš najbolja praksa ali da znake kako i to može

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }
    }
}


