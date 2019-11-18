\c df9tomf8fngp29;

CREATE TABLE      users (
  id              SERIAL PRIMARY KEY,
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  age             SMALLINT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  telephone       TEXT UNIQUE,
  profile_picture TEXT,
  created         TIMESTAMPTZ DEFAULT NOW(),
  updated         TIMESTAMPTZ DEFAULT NOW(),
  biography       TEXT,
  sex             BOOLEAN DEFAULT FALSE,
  is_removed      BOOLEAN DEFAULT FALSE
);

CREATE INDEX      fullname ON users (firstname, lastname);
