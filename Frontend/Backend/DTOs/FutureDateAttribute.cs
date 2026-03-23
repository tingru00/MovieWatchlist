using System.ComponentModel.DataAnnotations;

namespace GameTournamentAPI.DTOs
{
    // Custom validation attribute to ensure the date is not in the past
    public class FutureDateAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
        {
            if (value is DateTime date)
            {
                if (date >= DateTime.Now)
                    return ValidationResult.Success;
            }

            return new ValidationResult("Date cannot be in the past.");
        }
    }
}
