using CarRental.Domain.Entities.Booking;
using FluentAssertions;
using NUnit.Framework;

namespace CarRental.Domain.UnitTests.Entities;

public class BookingTests
{
    [Test]
    public void ShouldReturnTrue_IsDoubleBooking_01()
    {
        Booking firstBooking = new Booking();
        firstBooking.CarId = 1;
        firstBooking.From = new DateTime(2024, 06, 15);
        firstBooking.To = new DateTime(2024, 06, 20);
        firstBooking.IsCanceled = false;

        Booking secondBooking = new Booking();
        secondBooking.CarId = 1;
        secondBooking.From = new DateTime(2024, 06, 19);
        secondBooking.To = new DateTime(2024, 06, 25);
        secondBooking.IsCanceled = false;

        firstBooking.IsDoubleBooking(secondBooking).Should().BeTrue();
    }

    [Test]
    public void ShouldReturnTrue_IsDoubleBooking_02()
    {
        Booking firstBooking = new Booking();
        firstBooking.CarId = 1;
        firstBooking.From = new DateTime(2024, 06, 15);
        firstBooking.To = new DateTime(2024, 06, 20);
        firstBooking.IsCanceled = false;

        Booking secondBooking = new Booking();
        secondBooking.CarId = 1;
        secondBooking.From = new DateTime(2024, 06, 10);
        secondBooking.To = new DateTime(2024, 06, 21);
        secondBooking.IsCanceled = false;

        firstBooking.IsDoubleBooking(secondBooking).Should().BeTrue();
    }

    [Test]
    public void ShouldReturnFalse_IsDoubleBooking_03()
    {
        Booking firstBooking = new Booking();
        firstBooking.CarId = 1;
        firstBooking.From = new DateTime(2024, 06, 15);
        firstBooking.To = new DateTime(2024, 06, 20);
        firstBooking.IsCanceled = true;

        Booking secondBooking = new Booking();
        secondBooking.CarId = 1;
        secondBooking.From = new DateTime(2024, 06, 15);
        secondBooking.To = new DateTime(2024, 06, 20);
        secondBooking.IsCanceled = false;

        firstBooking.IsDoubleBooking(secondBooking).Should().BeFalse();
    }

    [Test]
    public void ShouldReturnFalse_IsDoubleBooking_04()
    {
        Booking firstBooking = new Booking();
        firstBooking.CarId = 1;
        firstBooking.From = new DateTime(2024, 06, 15);
        firstBooking.To = new DateTime(2024, 06, 20);
        firstBooking.IsCanceled = false;

        Booking secondBooking = new Booking();
        secondBooking.CarId = 1;
        secondBooking.From = new DateTime(2024, 06, 21);
        secondBooking.To = new DateTime(2024, 06, 26);
        secondBooking.IsCanceled = false;

        firstBooking.IsDoubleBooking(secondBooking).Should().BeFalse();
    }
}