import { Fragment, useId } from "react";

// Components
import Accordion from "./Accordion";
import Button from "./Button";
import CheckBoxList from "./CheckBoxList";
import CheckBoxListItem from "./CheckBoxListItem";
import Container from "./Container";
import DescriptionDetails from "./DescriptionDetails";
import DescriptionList from "./DescriptionList";
import DescriptionTerm from "./DescriptionTerm";
import Header from "./Header";
import List from "./List";
import ListItem from "./ListItem";
import NavigationBar from "./NavigationBar";
import Paper from "./Paper";
import RadioButtonList from "./RadioButtonList";
import RadioButtonListItem from "./RadioButtonListItem";

// Stylesheets
import style from "./Theme.module.scss";

export interface ThemeProps {
  appName: string;
  logo: string;
  logoPadding?: string;
  sizes?: {
    logoSmallWidth: string;
    logoLargeWidth: string;
  };
  colors?: {
    [key: string]: string;
  };
}

const Theme = (theme: ThemeProps) => {
  const renderColors = (theme: ThemeProps) => {
    if (!theme?.colors) return null;

    return Object.keys(theme.colors).map((color) => {
      const colorClassName = style[color] || "";
      return (
        <Fragment key={color}>
          <div>{color}</div>
          <div className={`${style.color} ${colorClassName}`}></div>
        </Fragment>
      );
    });
  };
  const checkboxListId = useId();
  const radioButtonListId = useId();

  if (!theme) return "Select a theme";

  return (
    <Fragment>
      <NavigationBar theme={theme} />
      <Container maxWidth="916px">
        <Paper noMargin>
          <section>
            <Header size={2}>Colors</Header>
            <div className={style.colorPalette}>{renderColors(theme)}</div>
          </section>

          <section>
            <Header size={2}>Typography</Header>
            <Header size={1} htmlTag="p">
              Heading size 1
            </Header>
            <Header size={2} htmlTag="p">
              Heading size 2
            </Header>
            <Header size={3} htmlTag="p">
              Heading size 3
            </Header>
            <Header size={4} htmlTag="p">
              Heading size 4
            </Header>
            <Header size={5} htmlTag="p">
              Heading size 5
            </Header>
            <p>Paragraph</p>
            <p>
              <a href="#theme">Hyperlink</a>
            </p>
          </section>

          <section>
            <Header size={2}>Accordions</Header>
            <Accordion title="Accordion with default color">
              <p>Accordion content</p>
            </Accordion>
            <Accordion title="Accordion with secondary color" color="secondary">
              <p>Accordion content</p>
            </Accordion>
          </section>

          <section>
            <Header size={2}>Buttons</Header>
            <Button color="primary" content="Primary button" arrow="left" />
            <Button
              color="secondary"
              content="Secondary button"
              arrow="right"
            />
            <Button color="neutral" content="Neutral button" />
          </section>

          <section>
            <Header size={2}>Checkboxes</Header>
            <CheckBoxList legend="Default checkbox list">
              <CheckBoxListItem
                onChange={() => console.log("onchange")}
                checked={true}
                name="checkboxlist"
                id={checkboxListId}
              >
                Label for checked checkbox
              </CheckBoxListItem>
              <CheckBoxListItem
                onChange={() => console.log("onchange")}
                name="checkboxlist"
                id={checkboxListId}
              >
                Label for unchecked checkbox
              </CheckBoxListItem>
            </CheckBoxList>
          </section>

          <section>
            <Header size={2}>Radio buttons</Header>
            <RadioButtonList legend="Default radio button list">
              <RadioButtonListItem
                onChange={() => console.log("onchange")}
                inputValue="value 1"
                name="radio-button-list-list-item"
                id={radioButtonListId}
                checked
              >
                Checked radio button
              </RadioButtonListItem>
              <RadioButtonListItem
                onChange={() => console.log("onchange")}
                inputValue="value 2"
                name="radio-button-list-list-item"
                id={radioButtonListId}
              >
                Unchecked radio button
              </RadioButtonListItem>
            </RadioButtonList>
          </section>

          <section>
            <Header size={2}>Lists</Header>
            <Header size={3}>Unordered list</Header>
            <List>
              <ListItem>First list item</ListItem>
              <ListItem>Second list item</ListItem>
              <ListItem>Third list item</ListItem>
            </List>

            <Header size={3}>Ordered list</Header>
            <List ordered>
              <ListItem>First list item</ListItem>
              <ListItem>Second list item</ListItem>
              <ListItem>Third list item</ListItem>
            </List>
          </section>

          <section>
            <Header size={2}>Description lists</Header>

            <Header size={3}>Description list variable title width</Header>
            <DescriptionList>
              <DescriptionTerm>First description term:</DescriptionTerm>
              <DescriptionDetails>First description details</DescriptionDetails>
              <DescriptionTerm>Second description term:</DescriptionTerm>
              <DescriptionDetails>
                Second description details
              </DescriptionDetails>
              <DescriptionTerm>Third description term:</DescriptionTerm>
              <DescriptionDetails>Third description details</DescriptionDetails>
            </DescriptionList>

            <Header size={3}>Description list with static title width</Header>
            <DescriptionList titleWidth="240px">
              <DescriptionTerm>First description term:</DescriptionTerm>
              <DescriptionDetails>First description details</DescriptionDetails>
              <DescriptionTerm>Second description term:</DescriptionTerm>
              <DescriptionDetails>
                Second description details
              </DescriptionDetails>
              <DescriptionTerm>Third description term:</DescriptionTerm>
              <DescriptionDetails>Third description details</DescriptionDetails>
            </DescriptionList>
          </section>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Theme;
