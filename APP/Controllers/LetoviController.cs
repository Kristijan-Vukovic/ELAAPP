using APP.Data;
using APP.Models;
using APP.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace APP.Controllers
{

    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom Let u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]

    public class LetController : ControllerBase
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
        public LetController(ELAContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Dohvaća sve letove iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        /// 
        /// <returns></returns>
        /// GET api/v1/Let
        /// 
        ///<remarks>
        ///   /// <returns>Letovi u bazi</returns>
        /// <response code="200">Sve OK, ako nema podataka content-length: 0 </response>
        /// <response code="400">Zahtjev nije valjan</response>
        /// <response code="503">Baza na koju se spajam nije dostupna</response>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var letovi = _context.Letovi.Select(let => new LetViewModel
                { 
                    Sifra = let.Sifra,
                    VrijemePolijetanja = let.VrijemePolijetanja,
                    VrijemeSlijetanja = let.VrijemeSlijetanja,
                    PreletKm = let.PreletKm,
                    ImePilota = $"{let.PilotInstanca!.Ime} {let.PilotInstanca.Prezime}",
                    TipZrakoplova = let.ZrakoplovInstanca!.TipZrakoplova
                }).ToList();
                if (letovi.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(letovi);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }

        /// <summary>
        /// Dohvaća let sa traženom šifrom iz baze
        /// </summary>
        /// <param name="sifra">Šifra leta</param>
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
                var let = _context.Letovi.Find(sifra);
                if (let == null)
                {
                    return BadRequest($"Ne postoji let sa šifrom {sifra} u bazi");
                }
                return new JsonResult(let);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Dodaje novi let u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/Let
        ///     {naziv: "Primjer naziva"}
        /// </remarks>
        /// <param name="let">Let za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Let s šifrom koju je dala baza</returns>
        [HttpPost]

        public IActionResult Post(Let let)
        {
            if (!ModelState.IsValid || let == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Letovi.Add(let);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, let);
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
        ///    PUT api/v1/let/1
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
        /// <param name="sifra">Šifra leta koji se mijenja</param>  
        /// <param name="let">Zrakoplov za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od letova koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi leta kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Let let)
        {
            if (sifra <= 0 || !ModelState.IsValid || let == null)
            {
                return BadRequest();
            }


            try
            {


                var letIzBaze = _context.Letovi.Find(sifra);

                if (letIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }


                // inače ovo rade mapperi
                // za sada ručno
                letIzBaze.VrijemePolijetanja = let.VrijemePolijetanja;
                letIzBaze.VrijemeSlijetanja = let.VrijemeSlijetanja;
                letIzBaze.PreletKm = let.PreletKm;
                letIzBaze.Pilot = let.Pilot;
                letIzBaze.Zrakoplov = let.Zrakoplov;

                _context.Letovi.Update(letIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, letIzBaze);
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
                var letIzbaze = _context.Letovi.Find(sifra);

                if (letIzbaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Letovi.Remove(letIzbaze);
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


