namespace APP.ViewModels
{
    /// <summary>
    /// View model (DTO) za letove
    /// </summary>
    public class LetViewModel
    {
        /// <summary>
        /// Ovo je šifra leta
        /// </summary>
        public int Sifra { get; set; }

        /// <summary>
        /// Ovo mi je vrijeme polijetanja 
        /// </summary>
        public DateTime VrijemePolijetanja { get; set; }

        /// <summary>
        /// Ovo mi je vrijeme slijetanja
        /// </summary>
        public DateTime VrijemeSlijetanja { get; set; }

        /// <summary>
        /// Ovo mi je prelet km
        /// </summary>
        public decimal? PreletKm { get; set; }

        /// <summary>
        /// Ovo je ime i prezime pilota
        /// </summary>
        public required string ImePilota { get; set; }

        /// <summary>
        /// Ovo je tip zrakoplova
        /// </summary>
        public required string TipZrakoplova { get; set; }
    }
}
