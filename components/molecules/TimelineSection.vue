<template>
  <section style="width: 100%">
    <v-row no-gutters>
      <v-col>
        <h1 class="text-center">
          {{ $t('timeline.title') }}
        </h1>
        <v-timeline :dense="$vuetify.breakpoint.xsOnly" class="ml-n7 ml-sm-0">
          <v-timeline-item
            v-for="(item, index) of timelineItems"
            :key="index"
            :small="!item.major"
            :color="item.color"
            :icon="item.icon"
            :right="$vuetify.breakpoint.xsOnly"
            fill-dot
          >
            <v-card>
              <v-card-title style="word-break: keep-all">
                {{ $t(item.title) }}
              </v-card-title>
              <v-card-subtitle>
                <i>
                  <span>
                    {{ $d(item.date, 'short') }}
                  </span>
                  <template v-if="item.endDate">
                    <span class="mx-1">–</span>
                    <span>
                      {{ $d(item.endDate, 'short') }}
                    </span>
                  </template>
                  <template v-if="item.link">
                    <span class="mx-1">·</span>
                    <a
                      :href="item.link.href"
                      target="_blank"
                      rel="noopener"
                      style="font-size: 0.875rem"
                    >
                      {{ $t(item.link.text) }}
                    </a>
                  </template>
                </i>
              </v-card-subtitle>
              <v-card-text v-if="item.text">
                {{ $t(item.text) }}
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts" setup>
import { mdiBriefcase, mdiSchool, mdiTrophy } from '@mdi/js'

interface TimelineItemLink {
  href: string
  text: string
}

interface TimelineItem {
  title: string
  date: Date
  endDate?: Date
  major: boolean
  link?: TimelineItemLink
  text?: string
  color?: string
  icon?: string
}

const award = {
  color: 'red',
  icon: mdiTrophy,
  major: false,
  title: 'timeline.award.title',
}

const career = {
  color: 'secondary',
  icon: mdiBriefcase,
}

const education = {
  color: 'primary',
  icon: mdiSchool,
}

const universityOfKasselLink: TimelineItemLink = {
  href: 'https://www.uni-kassel.de/',
  text: 'misc.university-of-kassel',
}

const timelineItems: TimelineItem[] = [
  {
    ...career,
    title: 'timeline.intern',
    date: new Date('2015-07-13'),
    endDate: new Date('2015-07-31'),
    major: false,
    link: {
      href: 'https://www.manserv.com/',
      text: 'Management Services Helwig Schmitt GmbH',
    },
    text: 'misc.software-engineer',
  },
  {
    ...education,
    title: 'timeline.abitur',
    date: new Date('2016-06-03'),
    major: true,
    link: {
      href: 'https://www.wgkassel.de/',
      text: 'Wilhelmsgymnasium Kassel',
    },
  },
  {
    ...award,
    date: new Date('2016-06-31'),
    link: {
      href: 'https://www.dpg-physik.de/auszeichnungen/dpg-preise/abiturpreis',
      text: 'misc.details',
    },
    text: 'timeline.award.dpg',
  },
  {
    ...education,
    title: 'timeline.university.begin',
    date: new Date('2016-10-01'),
    major: false,
    link: universityOfKasselLink,
    text: 'timeline.university.bsc-text',
  },
  {
    ...career,
    title: 'timeline.tutor.title',
    date: new Date('2017-11-01'),
    endDate: new Date('2018-02-31'),
    major: false,
    text: 'timeline.tutor.first',
  },
  {
    ...award,
    date: new Date('2018-07-09'),
    major: false,
    text: 'timeline.award.algods',
  },
  {
    ...career,
    title: 'timeline.tutor.title',
    date: new Date('2019-04-01'),
    endDate: new Date('2019-07-31'),
    major: false,
    text: 'timeline.tutor.second',
  },
  {
    ...career,
    title: 'timeline.tutor.title',
    date: new Date('2019-05-01'),
    endDate: new Date('2019-07-31'),
    major: false,
    text: 'timeline.tutor.third',
  },
  {
    ...career,
    title: 'timeline.intern',
    date: new Date('2020-11-01'),
    endDate: new Date('2020-12-31'),
    major: false,
    link: {
      href: 'https://www.yatta.de/en/start/',
      text: 'Yatta Solutions GmbH',
    },
    text: 'misc.software-engineer',
  },
  {
    ...education,
    title: 'timeline.university.degree-bsc',
    date: new Date('2021-03-31'),
    major: true,
    link: universityOfKasselLink,
  },
  {
    ...education,
    title: 'timeline.university.begin',
    date: new Date('2021-10-01'),
    major: false,
    link: {
      href: 'https://www.tuwien.at/en/',
      text: 'TU Wien',
    },
    text: 'timeline.university.msc-text',
  },
  {
    ...career,
    title: 'timeline.working-student',
    date: new Date('2021-10-01'),
    major: true,
    link: {
      href: 'https://senacor.com/',
      text: 'Senacor Technologies AG',
    },
    text: 'misc.software-engineer',
  },
].sort((first, second) => second.date.getTime() - first.date.getTime())
</script>
