import React from "react";
import shallow from "zustand/shallow";
import styled from "styled-components";
import { getIcon } from "../../components/common/icons";

import { Intro } from "../items/intro/Intro";
import { Description } from "../items/description/Description";
import { RatedPill } from "../items/skills/RatedPills";
import { UnratedTabs } from "../items/skills/UnratedTabs";
import { Exp } from "../items/exp/Exp";
import { EduSection } from "../items/education/EduSection";
import { List } from "../items/list/List";

import { LineSeparator } from "../items/separator/LineSeparator";
import { LegacyHeader } from "../items/section-layout/LegacyHeader";
import { SocialBar } from "../items/social/SocialBar";

import {
  useIntro,
  useExp,
  useSkills,
  useAchievements,
  useEducation,
} from "../../components/stores/data.store";

const GridContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 68% 10px 1fr;;
`;

const Divider = styled.div`
  height: 100%;
  width: 2px;
  background-color: #007bff;
`;

const GridColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:first-child{
    padding-right: 10px;
  }
`;

const EmployeName = styled.div`
  margin: 0;
  color: ${(props) => props.theme.primaryColor};
  font-size: 1.5rem;
`

export function LegacyTemplate() {
  const intro = useIntro((state: any) => state.intro);
  const education = useEducation((state: any) => state.education);
  const experience = useExp((state: any) => state.experience);
  const [keyProjects, certificates] = useAchievements(
    (state: any) => [state.keyProjects, state.certificates],
    shallow
  );
  const [technical, exposure, methodology, tools] = useSkills(
    (state: any) => [
      state.technical,
      state.exposure,
      state.methodology,
      state.tools,
    ],
    shallow
  );

  return (
    <GridContainer>
      <GridColumn>
        <EmployeName>{intro.name}</EmployeName>
        <Intro data={intro} />
        <SocialBar items={intro.social} />

        <LegacyHeader
          Icon={getIcon(experience.title)}
          title={experience.title}
        />
        <Exp companies={experience.companies} />
        <LineSeparator />
        <LegacyHeader
          Icon={getIcon(keyProjects.title)}
          title={keyProjects.title}
        />
        <List items={keyProjects.items} />

        <LineSeparator />
        <LegacyHeader
          Icon={getIcon(certificates.title)}
          title={certificates.title}
        />
        <List items={certificates.items} />
      </GridColumn>

      <Divider />

      <GridColumn>
        <LegacyHeader
          Icon={getIcon(intro.about.title)}
          title={intro.about.title}
        />
        <Description description={intro.about.description} />
        <LineSeparator />
        <LegacyHeader
          Icon={getIcon(intro.objective.title)}
          title={intro.objective.title}
        />
        <Description description={intro.objective.description} />
        <LineSeparator />
        <LegacyHeader
          Icon={getIcon(technical.title)}
          title={technical.title}
        />
        <RatedPill items={technical.items} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon(exposure.title)} title={exposure.title} />
        <UnratedTabs items={exposure.items} />

        <LineSeparator />
        <LegacyHeader
          Icon={getIcon(methodology.title)}
          title={methodology.title}
        />
        <UnratedTabs items={methodology.items} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon(tools.title)} title={tools.title} />
        <UnratedTabs items={tools.items} />
        <LineSeparator />
        <LegacyHeader
          Icon={getIcon(education.title)}
          title={education.title}
        />
        <EduSection items={education.items} />
      </GridColumn>
    </GridContainer>
  );
}