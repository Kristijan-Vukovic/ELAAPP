using APP.Models;

namespace APP.Models
{
    /// <summary>
    /// Ovo mi je POCO koji je mapiran na bazu
    /// </summary>
    public class Let: Entitet

    {
        /// <summary>
        /// Ovo mi je vrijeme polijetanja 
        /// </summary>
        public DateTime? Vrijemepolijetanja { get; set; }

        /// <summary>
        /// Ovo mi je vrijeme slijetanja
        /// </summary>
        public DateTime? Vrijemeslijetanja  { get; set; }

        /// <summary>
        /// Ovo mi je prelet km
        /// </summary>
        public decimal? Preletkm { get; set; }

        public int Pilot  { get; set; }

        public int Zrakoplov { get; set; }


    }
}
