import { expect, test } from '@playwright/test'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has an avatar', async ({ page }) => {
    const avatar = page.getByTestId('avatar')
    await avatar.scrollIntoViewIfNeeded()
    await expect(avatar).toBeVisible()
  })

  test('has badges and buttons', async ({ page }) => {
    const badges = page.getByTestId('badges')
    await badges.scrollIntoViewIfNeeded()
    await expect(badges).toBeVisible()

    const badgeIcons = [
      {
        name: 'GitHub',
        href: 'https://github.com/DerYeger',
      },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jan-müller-644144249/' },
      {
        name: 'XING',
        href: 'https://www.xing.com/profile/Jan_Mueller1092/cv',
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/DerYeger',
      },
    ]
    for (const badgeIcon of badgeIcons) {
      const icon = badges.getByTestId(`badge-${badgeIcon.name}`)
      await expect(icon).toBeVisible()
      await expect(icon).toHaveAttribute('href', badgeIcon.href)
    }

    const badgeButtons = [{
      href: '#experience',
      text: 'CV',
    }, {
      href: '/blog',
      text: 'Blog',
    }, {
      href: '/photography',
      text: 'Photography',
    }]
    for (const badgeButton of badgeButtons) {
      const button = badges.getByTestId(`badge-button-${badgeButton.href}`)
      await expect(button).toBeVisible()
      await expect(button).toContainText(badgeButton.text)
      await expect(button).toHaveAttribute('href', badgeButton.href)
    }
  })

  test('shows about me section', async ({ page }) => {
    const aboutMe = page.locator('text=About Me')
    await aboutMe.scrollIntoViewIfNeeded()
    await expect(aboutMe).toBeVisible()
  })

  test('shows projects', async ({ page }) => {
    const projects = [
      'Formi',
      'Masonry Wall',
      'Refunk',
      'WienerTime',
      'Noted',
      'Apollo',
      'CM2ML',
      'Experiments',
      'yeger monorepo',
    ]
    for (const project of projects) {
      const projectLocator = page.locator(`text=${project}`)
      await projectLocator.scrollIntoViewIfNeeded()
      await expect(projectLocator).toBeVisible()
    }
  })

  test('shows experience', async ({ page }) => {
    const experience = page.getByTestId('experience')
    await expect(experience).toBeVisible()

    const yattaExperience = experience.getByTestId('Yatta Solutions GmbH')
    await expect(yattaExperience).toBeVisible()
    await expect(yattaExperience).toContainText('Software Engineer')
    await expect(yattaExperience).toContainText('Internship')
    await expect(yattaExperience).toContainText('Nov 2020')
    await expect(yattaExperience).toContainText('Dec 2020')
    await expect(yattaExperience.locator('a')).toHaveAttribute('href')

    await expect(experience.locator('li')).toHaveCount(4 + 5)
  })

  test('shows education', async ({ page }) => {
    const education = page.getByTestId('education')
    await expect(education).toBeVisible()

    const computerScience = education.getByTestId('Computer Science (B.Sc.)')
    await expect(computerScience).toBeVisible()
    await expect(computerScience).toContainText('University of Kassel')
    await expect(computerScience).toContainText('Oct 2016')
    await expect(computerScience).toContainText('Mar 2021')

    await expect(education.locator('li')).toHaveCount(3)
  })

  test('shows awards', async ({ page }) => {
    const awards = page.getByTestId('awards')
    await expect(awards).toBeVisible()

    const dpgAward = awards.getByTestId('DPG-Abiturpreis')
    await expect(dpgAward).toBeVisible()
    await expect(dpgAward).toContainText('DPG-Abiturpreis')
    await expect(dpgAward).toContainText('Jul 2016')
    await expect(dpgAward.locator('a')).toHaveAttribute('href')

    await expect(awards.locator('li')).toHaveCount(3)
  })
})
