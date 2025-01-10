import { Meta, StoryObj } from '@storybook/react';

import { CodeSnippet, CodeSnippetProps } from './CodeSnippet';

const meta: Meta = {
  title: 'Library/Components/Code Snippet',
  component: CodeSnippet,
};

export default meta;

type Story = StoryObj<CodeSnippetProps>;

export const Default: Story = {
  render: (args: CodeSnippetProps) => <CodeSnippet {...args} />,
  args: {
    code: `<?php

    class SomeClass
    {
                public function someMagic (int $firstNumber, int $secondNumber)
                       if ($firstNumber > 10) {
                                   return $firstNumber * $secondNumber ;
    }
    `,
    title: 'cache-advance.config.js',
    className: 'w-[600px]',
  },
};
