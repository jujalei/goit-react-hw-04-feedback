import { useState } from 'react';
import { Section } from './Section';
import { Notification } from './Notification';

import { FeedbackBTN } from './button/FeedbackBtn';
import { Statistics } from './statistic/Statistic';

export function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const { good, neutral, bad } = feedback;

  const countTotalFeedback = () => good + neutral + bad;

  const updateFeedback = nameSt => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [nameSt]: prevFeedback[nameSt] + 1,
    }));
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100) || 0;
  };

  const nameBtn = ['good', 'neutral', 'bad'];

  return (
    <>
      <Section title={'Please leave feedback'}>
        <FeedbackBTN options={nameBtn} onLeaveFeedback={updateFeedback} />
      </Section>

      <Section title={'Statistics'}>
        {countTotalFeedback() <= 0 ? (
          <Notification message="There is no feedback"></Notification>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </>
  );
}
