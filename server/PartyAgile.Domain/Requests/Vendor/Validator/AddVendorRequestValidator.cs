using FluentValidation;

namespace PartyAgile.Domain.Requests.Vendor.Validator
{
    public class AddVendorRequestValidator : AbstractValidator<AddVendorRequest>
    {
        public AddVendorRequestValidator()
        {
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.ContactName).NotEmpty();
            RuleFor(x => x.Budget).NotEmpty();
            RuleFor(x => x.DepositPaid).NotEmpty();

        }
    }
}
