using FluentValidation;

namespace PartyAgile.Domain.Requests.Event.Validator
{
    public class AddEventRequestValidator : AbstractValidator<AddEventRequest>
    {
        public AddEventRequestValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.EventDate).NotEmpty();
            RuleFor(x => x.Budget).NotEmpty();
            RuleFor(x => x.Guests).NotEmpty();
        }
    }
}
