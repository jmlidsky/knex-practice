BEGIN;

INSERT INTO blogful_articles (title, date_published, content)
VALUES
('climbing', '2016-01-06 12:00:00', 'how to climb'),
('triathlons', '2017-04-23 15:00:00', 'into to tris'),
('steelers', '2018-01-25 19:00:00', 'history of the steelers'),
('ultimate frisbee', '2018-03-13 09:00:00', 'rules of ultimate'),
('cooking', '2019-04-03 07:00:00', 'cooking 101'),
('baking', '2019-05-05 21:00:00', 'baking 101'),
('running', now() - '25 days'::INTERVAL, 'running form'),
('web dev', now() - '25 days'::INTERVAL, 'into to web dev'),
('succulents', now() - '20 days'::INTERVAL, 'how to keep them alive'),
('labs', now() - '15 days'::INTERVAL, 'all about labradors'),
('travel', now() - '15 days'::INTERVAL, 'travel destinations'),
('hangboarding', now() - '15 days'::INTERVAL, 'hangboarding 101'),
('the new', now() - '10 days'::INTERVAL, 'boulders at the new'),
('pull ups', now() - '10 days'::INTERVAL, 'pull up training'),
('exercise', now() - '8 days'::INTERVAL, 'exercise library'),
('cycling', now() - '6 days'::INTERVAL, 'rules of the road'),
('swimming', now() - '5 days'::INTERVAL, 'stroke development'),
('basketball', now() - '2 days'::INTERVAL, 'offenses and defenses'),
('hiking', now() - '2 days'::INTERVAL, 'local hikes'),
('fishing', now() - '5 hours'::INTERVAL, 'how to set up your fishing rod');

COMMIT; 