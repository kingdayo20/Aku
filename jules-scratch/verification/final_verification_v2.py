from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:5173/")

        # Log in
        page.get_by_label("Email Address").fill("test@example.com")
        page.get_by_label("Password").fill("password")
        page.get_by_role("button", name="Sign In").click()
        page.wait_for_load_state("networkidle")

        # Verify Dashboard
        expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/dashboard.png")

        # Verify Claims page
        page.get_by_role("button", name="Claims").click()
        expect(page.get_by_role("heading", name="Claims")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/claims.png")

        # Verify Appeals page
        page.get_by_role("button", name="Appeals").click()
        expect(page.get_by_role("heading", name="Appeals")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/appeals.png")

        # Verify Payers page
        page.get_by_role("button", name="Payers").click()
        expect(page.get_by_role("heading", name="Payers")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/payers.png")

        # Verify Customers page
        page.get_by_role("button", name="Customers").click()
        expect(page.get_by_text("Customers Page")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/customers.png")

        # Verify Companies page
        page.get_by_role("button", name="Companies").click()
        expect(page.get_by_text("Companies Page")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/companies.png")

        # Verify Settings page
        page.get_by_role("button", name="Settings").click()
        expect(page.get_by_role("heading", name="Settings")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/settings.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)