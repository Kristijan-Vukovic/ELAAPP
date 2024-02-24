using APP.Models;

namespace APP.Models
{
    /// <summary>
    /// Ovo mi je POCO koji je mapiran na bazu
    /// </summary>
    public class Pilot: Entitet

    {
        /// <summary>
        /// Ovo mi je ime pilota
        /// </summary>
        public string? Ime { get; set; }

        /// <summary>
        /// Ovo mi je prezime pilota
        /// </summary>
        public string? Prezime  { get; set; }

        /// <summary>
        /// Ovo mi je BrojDozvole
        /// </summary>
        public string? BrojDozvole { get; set; }
    }
}
