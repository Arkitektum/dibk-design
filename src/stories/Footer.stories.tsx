// stories/Footer.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import Footer from "../components/Footer";

const meta: Meta<typeof Footer> = {
    title: "Primitives/Footer",
    component: Footer,
    argTypes: {},
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => <Footer {...args} />;

export const Default: Story = {
    args: {
        children: <span>Footer content here</span>
    },
    render
};

// The footer only supplies the band and its spacing — the content and its
// layout are the application's.
export const WithColumns: Story = {
    args: {
        children: (
            <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
                <div>
                    <strong>Direktoratet for byggkvalitet</strong>
                    <p>Postboks 8742 Youngstorget, 0028 Oslo</p>
                </div>
                <div>
                    <p>
                        <a href="https://dibk.no">dibk.no</a>
                    </p>
                    <p>
                        <a href="mailto:post@dibk.no">post@dibk.no</a>
                    </p>
                </div>
            </div>
        )
    },
    render
};
