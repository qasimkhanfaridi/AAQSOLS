"""Generate AAQSOLS Company Profile PDF."""

from fpdf import FPDF
from pathlib import Path

OUTPUT = Path(__file__).parent / "Company-Profile-AAQSOLS.pdf"


class ProfilePDF(FPDF):
    def section(self, title: str):
        self.ln(4)
        self.set_font("Helvetica", "B", 12)
        self.set_fill_color(12, 35, 64)
        self.set_text_color(255, 255, 255)
        self.cell(0, 8, f"  {title}", ln=True, fill=True)
        self.set_text_color(0, 0, 0)
        self.ln(3)

    def body(self, text: str):
        self.set_font("Helvetica", "", 9)
        self.multi_cell(0, 5, text)
        self.ln(2)

    def bullet(self, text: str):
        self.set_font("Helvetica", "", 9)
        self.multi_cell(0, 5, f"  -  {text}")
        self.ln(1)


def main():
    pdf = ProfilePDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 20)
    pdf.cell(0, 10, "AAQSOLS", ln=True, align="C")
    pdf.set_font("Helvetica", "", 11)
    pdf.cell(0, 6, "Software Development & Dedicated Engineering Teams", ln=True, align="C")
    pdf.ln(2)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(0, 5, "Rawalpindi, Pakistan  |  info@aaqsols.com  |  +92 304 0200070  |  www.aaqsols.com", ln=True, align="C")
    pdf.ln(6)

    pdf.section("ABOUT US")
    pdf.body(
        "AAQSOLS is a Pakistan-based software development company focused on FinTech, banking integrations, "
        "and enterprise .NET applications. Our team of 10 engineers includes backend developers, full-stack "
        "developers, QA, DevOps, and project management.\n\n"
        "We have production experience building digital wallet platforms and payment APIs that handle "
        "100,000+ daily transactions with 30+ bank and third-party integrations."
    )

    pdf.section("SERVICES")
    pdf.bullet("FinTech & Payment Systems - wallets, gateways, RAAST/IBFT, KYC, transaction processing")
    pdf.bullet(".NET Core Development - APIs, microservices, admin portals, legacy modernization")
    pdf.bullet("Third-Party Integrations - SOAP/REST with banks, telcos, identity providers, SMS gateways")
    pdf.bullet("Dedicated Development Teams - full squad on monthly retainer")
    pdf.bullet("Staff Augmentation - senior .NET developers embedded in your team")

    pdf.section("TECHNOLOGY STACK")
    pdf.body(
        "C#, .NET Core, ASP.NET MVC, React.js, SQL Server, Microservices, Clean Architecture, CQRS, "
        "REST, SOAP, Microsoft Azure, Azure Functions, CI/CD, Agile/Scrum"
    )

    pdf.section("KEY METRICS")
    pdf.bullet("Team Size: 10 engineers (dev, QA, DevOps, PM)")
    pdf.bullet("Platform Scale: 587 REST endpoints, 67 API controllers, 4 deployable microservices")
    pdf.bullet("Integrations: 30+ bank and third-party APIs (SOAP & REST)")
    pdf.bullet("Transaction Volume: 100,000+ daily / 3 million+ monthly (production fintech)")
    pdf.bullet("Payment Flows: RAAST, IBFT, QR, bill pay, telco, cards, wallet transfers")
    pdf.bullet("Database: 86+ stored procedures, performance-tuned SQL Server")

    pdf.section("ENGAGEMENT MODELS")
    pdf.bullet("Fixed-Price Project - defined scope, milestone delivery, 30-50% upfront")
    pdf.bullet("Dedicated Team - monthly retainer, team assigned exclusively to your product")
    pdf.bullet("Staff Augmentation - per developer per month, works your hours and tools")

    pdf.section("WHY AAQSOLS")
    pdf.bullet("Production FinTech experience - live wallet and payment systems, not demo apps")
    pdf.bullet("Full team, not one freelancer - PM, QA, DevOps, and multiple developers included")
    pdf.bullet("Pakistan value, international quality - competitive rates with UAE/UK/US timezone overlap")
    pdf.bullet("Technical leadership - founder is Lead Software Engineer with 8 years in .NET and banking")

    pdf.section("LEADERSHIP")
    pdf.body(
        "Qasim Khan - Founder & Lead Software Engineer\n"
        "8 years in .NET, microservices, and FinTech. Previously Lead Software Engineer at Zindigi "
        "(digital wallet platform) and senior developer on wallet/banking integrations. Expert in "
        "Clean Architecture, CQRS, SOAP/REST bank integrations, and high-volume SQL Server systems."
    )

    pdf.section("CONTACT")
    pdf.body(
        "Qasim Khan, Founder\n"
        "Email: qasim119119@gmail.com | sales@aaqsols.com\n"
        "Phone: +92 304 0200070\n"
        "Location: Rawalpindi, Pakistan\n\n"
        "Initial consultation is free. We respond within 24 hours."
    )

    pdf.output(str(OUTPUT))
    print(f"Created: {OUTPUT}")


if __name__ == "__main__":
    main()
