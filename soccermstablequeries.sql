DROP DATABASE IF EXISTS playerdb;

CREATE DATABASE IF NOT EXISTS playerdb;

use playerdb;

 
-- Create the Club table
CREATE TABLE IF NOT EXISTS club (
    club_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL, -- name of club 
    foundation_year INT,
    country VARCHAR(100),
    stadium_name VARCHAR(255),
    capacity INT -- number of players in the club
);

-- Create the Player table
CREATE TABLE IF NOT EXISTS player (
    player_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT,
    nationality VARCHAR(100), 
    position VARCHAR(50), -- Center back, Midfielder, Striker ...
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    minutes_played INT DEFAULT 0,
    injuries VARCHAR(255) DEFAULT 'Not injured', -- If player is injured (torn muscle, sprain ankle) ...
    club_id INT, 
    FOREIGN KEY (club_id) REFERENCES club(club_id) ON DELETE SET NULL
); 

-- Create the Fan table
CREATE TABLE IF NOT EXISTS fan (
    fan_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT,
    nationality VARCHAR(100),
	membership_status VARCHAR(50),
    player_id INT,
    club_id INT,
    FOREIGN KEY (player_id) REFERENCES player(player_id)
    ON DELETE SET NULL,
    FOREIGN KEY (club_id) REFERENCES club(club_id)
    ON DELETE SET NULL
);

-- Create the Competition table
CREATE TABLE IF NOT EXISTS competition (
    competition_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL, -- Leage, Cup ...
    country VARCHAR(100), -- where the competition is 
    start_date DATE, -- when the competion start 
    end_date DATE -- when the comoetion end 
);

-- Create the Match table
CREATE TABLE IF NOT EXISTS `match` (
    match_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL, -- the day of the match (game)
    game_time TIME,
    location VARCHAR(255),
    home_team INT,
    away_team INT,
    score CHAR(10), -- Format: "Home-Away" 
    competition_id INT NOT NULL, 
    FOREIGN KEY (home_team) REFERENCES club(club_id) ON DELETE CASCADE,
    FOREIGN KEY (away_team) REFERENCES club(club_id) ON DELETE CASCADE,
    FOREIGN KEY (competition_id) REFERENCES competition(competition_id) ON DELETE CASCADE

);

-- Create the Coach table
CREATE TABLE IF NOT EXISTS coach (
    coach_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    age INT,
    nationality VARCHAR(100),
    experience_years INT DEFAULT 10,
    club_id INT NOT NULL,
    FOREIGN KEY (club_id) REFERENCES club(club_id) ON DELETE CASCADE
);

-- Create the Transfer table (Bridge table between Player and Club)
CREATE TABLE IF NOT EXISTS transfer (
	transfer_id INT PRIMARY KEY AUTO_INCREMENT,
	transfer_fee INT,
    transfer_date DATE, 
    player_id INT NOT NULL,
    from_club_id INT NOT NULL,
    to_club_id INT NOT NULL, 
    FOREIGN KEY (player_id) REFERENCES player(player_id) ON DELETE CASCADE,
    FOREIGN KEY (from_club_id) REFERENCES club(club_id) ON DELETE CASCADE,
    FOREIGN KEY (to_club_id) REFERENCES club(club_id) ON DELETE CASCADE
);


-- insert data in the tables

INSERT INTO club (name, foundation_year, country, stadium_name, capacity)
VALUES 
('Manchester United', 1902, 'England', 'Old Trafford', 76000),
('Real Madrid', 1902, 'Spain', 'Santiago Bernabeu', 81044),
('FC Barcelona', 1902, 'Spain', 'Camp Nou', 99354),
('Bayern Munich', 1900, 'Germany', 'Allianz Arena', 75000),
('Juventus', 1920, 'Italy', 'Allianz Stadium', 41507),
('Paris Saint-Germain', 1970, 'France', 'Parc des Princes', 47929),
('AC Milan', 1899, 'Italy', 'San Siro', 75000),
('Liverpool', 1892, 'England', 'Anfield', 53394),
('Chelsea', 1905, 'England', 'Stamford Bridge', 41631),
('Borussia Dortmund', 1909, 'Germany', 'Signal Iduna Park', 81365),
('Ajax Amsterdam', 1900, 'Netherlands', 'Johan Cruyff Arena', 55300),
('Inter Milan', 1908, 'Italy', 'San Siro', 75000),
('Arsenal', 1886, 'England', 'Emirates Stadium', 60703),
('Atletico Madrid', 1903, 'Spain', 'Wanda Metropolitano', 68456),
('Manchester City', 1880, 'England', 'Etihad Stadium', 53400),
('Tottenham Hotspur', 1882, 'England', 'Tottenham Hotspur Stadium', 62850),
('Sevilla FC', 1905, 'Spain', 'Ramon Sanchez Pizjuan Stadium', 43883),
('AS Roma', 1927, 'Italy', 'Stadio Olimpico', 70634),
('Lazio', 1900, 'Italy', 'Stadio Olimpico', 70634),
('Napoli', 1926, 'Italy', 'Stadio Diego Armando Maradona', 54726),
('RB Leipzig', 2009, 'Germany', 'Red Bull Arena', 47100),
('Lyon', 1950, 'France', 'Groupama Stadium', 59186),
('Marseille', 1899, 'France', 'Stade Velodrome', 67394),
('Benfica', 1904, 'Portugal', 'Estadio da Luz', 64500),
('Porto', 1893, 'Portugal', 'Estadio do Dragao', 50033),
('Sporting Lisbon', 1906, 'Portugal', 'Estadio Jose Alvalade', 50044),
('Celtic', 1887, 'Scotland', 'Celtic Park', 60832),
('Rangers', 1872, 'Scotland', 'Ibrox Stadium', 50817),
('Feyenoord', 1908, 'Netherlands', 'De Kuip', 51177),
('PSV Eindhoven', 1913, 'Netherlands', 'Philips Stadion', 35000);

INSERT INTO player (name, age, nationality, position, goals, assists, minutes_played, injuries, club_id)
VALUES 
('Cristiano Ronaldo', 39, 'Portugal', 'Forward', 819, 234, 58341, 'Not injured', 2),
('Lionel Messi', 37, 'Argentina', 'Forward', 823, 304, 59283, 'Not injured', 3),
('Kylian Mbappe', 25, 'France', 'Forward', 250, 90, 20103, 'Not injured', 6),
('Erling Haaland', 23, 'Norway', 'Striker', 150, 40, 12984, 'Not injured', 15),
('Kevin De Bruyne', 33, 'Belgium', 'Midfielder', 75, 220, 43000, 'Hamstring strain', 15),
('Virgil van Dijk', 32, 'Netherlands', 'Center Back', 20, 5, 38000, 'Not injured', 8),
('Mohamed Salah', 31, 'Egypt', 'Forward', 203, 110, 39045, 'Not injured', 8),
('Robert Lewandowski', 36, 'Poland', 'Striker', 425, 100, 45200, 'Not injured', 3),
('Neymar Jr.', 32, 'Brazil', 'Forward', 282, 150, 38000, 'Knee injury', 6),
('Harry Kane', 30, 'England', 'Striker', 250, 80, 32000, 'Not injured', 16),
('Karim Benzema', 36, 'France', 'Striker', 350, 120, 45250, 'Not injured', 2),
('Luka Modric', 38, 'Croatia', 'Midfielder', 50, 150, 45000, 'Not injured', 2),
('Gavi', 20, 'Spain', 'Midfielder', 10, 20, 8000, 'Not injured', 3),
('Pedri', 21, 'Spain', 'Midfielder', 15, 30, 12000, 'Not injured', 3),
('Marc-Andre ter Stegen', 32, 'Germany', 'Goalkeeper', 0, 0, 55000, 'Not injured', 3),
('Manuel Neuer', 38, 'Germany', 'Goalkeeper', 0, 0, 65000, 'Broken arm', 4),
('Joshua Kimmich', 29, 'Germany', 'Midfielder', 40, 85, 32500, 'Not injured', 4),
('Sadio Mane', 32, 'Senegal', 'Forward', 150, 80, 32000, 'Not injured', 4),
('Raheem Sterling', 29, 'England', 'Winger', 140, 95, 31000, 'Ankle sprain', 9),
('Paul Pogba', 31, 'France', 'Midfielder', 70, 100, 30000, 'Not injured', 5),
('Bruno Fernandes', 30, 'Portugal', 'Midfielder', 85, 120, 29000, 'Not injured', 1),
('Jadon Sancho', 24, 'England', 'Winger', 50, 60, 22000, 'Not injured', 1),
('Casemiro', 32, 'Brazil', 'Defensive Midfielder', 25, 50, 30000, 'Not injured', 1),
('Zlatan Ibrahimovic', 42, 'Sweden', 'Striker', 560, 160, 72000, 'Not injured', 7),
('Heung-Min Son', 31, 'South Korea', 'Winger', 180, 70, 35000, 'Not injured', 16),
('Alisson Becker', 31, 'Brazil', 'Goalkeeper', 0, 1, 40000, 'Not injured', 8),
('Andy Robertson', 30, 'Scotland', 'Left Back', 20, 70, 36000, 'Not injured', 8),
('Trent Alexander-Arnold', 26, 'England', 'Right Back', 15, 100, 33000, 'Not injured', 8),
('Ruben Dias', 27, 'Portugal', 'Center Back', 10, 5, 29000, 'Not injured', 15),
('Phil Foden', 24, 'England', 'Midfielder', 70, 50, 19000, 'Not injured', 15);

INSERT INTO fan (name, age, nationality, membership_status, player_id, club_id)
VALUES
('John Smith', 25, 'England', 'Active', 1, 2),
('Emily Johnson', 30, 'USA', 'Active', 2, 3),
('Carlos Hernandez', 35, 'Mexico', 'Inactive', 3, 6),
('Aisha Khan', 28, 'Pakistan', 'Active', 4, 15),
('Hiro Tanaka', 22, 'Japan', 'Active', 5, 15),
('Fatima Ali', 27, 'Egypt', 'Inactive', 6, 8),
('Liam O\'Connor', 32, 'Ireland', 'Active', 7, 8),
('Olivia Brown', 29, 'Australia', 'Pending', 8, 3),
('Noah Garcia', 40, 'Spain', 'Inactive', 9, 6),
('Sophia Wilson', 21, 'Canada', 'Active', 10, 16),
('Alexander Schmidt', 34, 'Germany', 'Active', 11, 2),
('Emma Müller', 26, 'Germany', 'Inactive', 12, 2),
('Lucas Rossi', 24, 'Argentina', 'Active', 13, 3),
('Chloe Martin', 33, 'France', 'Pending', 14, 3),
('Elena Rossi', 31, 'Italy', 'Active', 15, 3),
('Ethan Wang', 23, 'China', 'Pending', 16, 4),
('Isabella Li', 29, 'Hong Kong', 'Active', 17, 4),
('Oliver Lee', 38, 'South Korea', 'Inactive', 18, 4),
('Sophia Patel', 25, 'India', 'Active', 19, 9),
('Jacob Lopez', 28, 'Colombia', 'Pending', 20, 5),
('Amelia Silva', 22, 'Brazil', 'Active', 21, 1),
('Daniel Torres', 31, 'Portugal', 'Active', 22, 1),
('Grace Kim', 27, 'South Korea', 'Inactive', 23, 1),
('Oscar Romero', 35, 'Paraguay', 'Active', 24, 7),
('Lily Taylor', 30, 'New Zealand', 'Pending', 25, 16),
('William Carter', 26, 'USA', 'Active', 26, 8),
('Zara Ahmed', 33, 'Bangladesh', 'Active', 27, 8),
('Benjamin Novak', 40, 'Poland', 'Inactive', 28, 8),
('Mia Gonzalez', 20, 'Chile', 'Active', 29, 15),
('Lucas Thompson', 24, 'Scotland', 'Active', 30, 15);

INSERT INTO competition (name, type, country, start_date, end_date)
VALUES
('Premier League', 'League', 'England', '2024-08-01', '2025-05-31'),
('FA Cup', 'Cup', 'England', '2024-09-01', '2025-04-30'),
('La Liga', 'League', 'Spain', '2024-08-15', '2025-05-25'),
('Copa del Rey', 'Cup', 'Spain', '2024-10-01', '2025-04-20'),
('Bundesliga', 'League', 'Germany', '2024-08-18', '2025-05-27'),
('DFB-Pokal', 'Cup', 'Germany', '2024-09-10', '2025-04-22'),
('Serie A', 'League', 'Italy', '2024-08-20', '2025-05-30'),
('Coppa Italia', 'Cup', 'Italy', '2024-10-05', '2025-04-18'),
('Ligue 1', 'League', 'France', '2024-08-12', '2025-05-28'),
('Coupe de France', 'Cup', 'France', '2024-09-15', '2025-04-25'),
('Champions League', 'League', 'Europe', '2024-09-01', '2025-06-10'),
('Europa League', 'League', 'Europe', '2024-09-07', '2025-05-22'),
('Copa Libertadores', 'League', 'South America', '2024-02-15', '2024-11-28'),
('AFC Champions League', 'League', 'Asia', '2024-09-20', '2025-05-10'),
('MLS Cup', 'Cup', 'USA', '2024-03-01', '2024-11-10'),
('Super Lig', 'League', 'Turkey', '2024-08-22', '2025-05-26'),
('KNVB Cup', 'Cup', 'Netherlands', '2024-09-25', '2025-04-21'),
('Eredivisie', 'League', 'Netherlands', '2024-08-10', '2025-05-24'),
('Scottish Premiership', 'League', 'Scotland', '2024-08-05', '2025-05-31'),
('Belgian Pro League', 'League', 'Belgium', '2024-08-08', '2025-05-27'),
('Allsvenskan', 'League', 'Sweden', '2024-04-02', '2024-11-05'),
('Primeira Liga', 'League', 'Portugal', '2024-08-19', '2025-05-29'),
('J1 League', 'League', 'Japan', '2024-02-23', '2024-12-02'),
('Australian A-League', 'League', 'Australia', '2024-10-14', '2025-05-15'),
('K League 1', 'League', 'South Korea', '2024-03-01', '2024-11-30'),
('Brazilian Serie A', 'League', 'Brazil', '2024-04-28', '2024-12-08'),
('Indian Super League', 'League', 'India', '2024-10-01', '2025-04-10'),
('CAF Champions League', 'League', 'Africa', '2024-08-12', '2025-05-12'),
('CONCACAF Champions League', 'League', 'North America', '2024-03-05', '2024-11-02'),
('Club World Cup', 'Cup', 'Global', '2024-12-12', '2024-12-22');


INSERT INTO `match` (date, game_time, location, home_team, away_team, score, competition_id)
VALUES
('2024-08-10', '19:00:00', 'Old Trafford', 1, 4, '2-1', 1),
('2024-08-12', '21:00:00', 'Anfield', 1, 2, '3-3', 1),
('2024-08-15', '20:00:00', 'Santiago Bernabeu', 4, 5, '1-2', 3),
('2024-08-18', '18:00:00', 'Allianz Arena', 10, 3, '4-0', 5);

INSERT INTO coach (title, name, age, nationality, experience_years, club_id)
VALUES
('Head Coach', 'Pep Guardiola', 53, 'Spain', 20, 1),
('Assistant Coach', 'Mikel Arteta', 42, 'Spain', 8, 2),
('Head Coach', 'Carlo Ancelotti', 65, 'Italy', 30, 3),
('Goalkeeping Coach', 'Xavi Valero', 50, 'Spain', 15, 4),
('Defensive Coach', 'Rui Faria', 48, 'Portugal', 12, 5),
('Head Coach', 'Jurgen Klopp', 57, 'Germany', 22, 6),
('Fitness Coach', 'Andreas Kornmayer', 52, 'Germany', 18, 6),
('Head Coach', 'Diego Simeone', 54, 'Argentina', 25, 7),
('Tactical Coach', 'Oscar Ortega', 55, 'Uruguay', 20, 7),
('Assistant Coach', 'Massimo Neri', 62, 'Italy', 27, 8),
('Head Coach', 'Mauricio Pochettino', 51, 'Argentina', 18, 9),
('Head Coach', 'Thomas Tuchel', 50, 'Germany', 17, 10),
('Fitness Coach', 'Rainer Schrey', 47, 'Germany', 14, 10),
('Head Coach', 'Zinedine Zidane', 52, 'France', 15, 11),
('Tactical Coach', 'David Bettoni', 51, 'France', 13, 11),
('Head Coach', 'Antonio Conte', 54, 'Italy', 20, 12),
('Assistant Coach', 'Christian Stellini', 49, 'Italy', 14, 12),
('Head Coach', 'Hansi Flick', 59, 'Germany', 21, 13),
('Defensive Coach', 'Danny Röhl', 34, 'Germany', 7, 13),
('Head Coach', 'Luis Enrique', 54, 'Spain', 19, 14),
('Goalkeeping Coach', 'Jose Sambade', 56, 'Spain', 20, 14),
('Head Coach', 'Erik ten Hag', 54, 'Netherlands', 16, 15),
('Assistant Coach', 'Steve McClaren', 63, 'England', 30, 15),
('Head Coach', 'Graham Potter', 49, 'England', 12, 16),
('Fitness Coach', 'Chris Jones', 45, 'England', 15, 16),
('Head Coach', 'Brendan Rodgers', 51, 'Northern Ireland', 15, 17),
('Tactical Coach', 'John Kennedy', 40, 'Scotland', 10, 17),
('Head Coach', 'Marcelo Gallardo', 48, 'Argentina', 14, 18),
('Assistant Coach', 'Matías Biscay', 47, 'Argentina', 12, 18);

-- the insert into transfer is intentionally commented out the transfer table should be empty.ALTER

# INSERT INTO transfer (transfer_fee, transfer_date, player_id, from_club_id, to_club_id)
# VALUES
# (85000000, '2023-07-01', 1, 3, 6),
# (40000000, '2022-01-15', 2, 5, 8),
# (75000000, '2021-06-20', 3, 1, 4),
# (30000000, '2023-01-12', 4, 2, 9),
# (60000000, '2020-07-08', 5, 7, 10),
# (45000000, '2023-09-05', 6, 8, 12),
# (90000000, '2021-08-15', 7, 4, 15),
# (65000000, '2022-12-22', 8, 10, 14),
# (80000000, '2020-06-10', 9, 6, 13),
# (120000000, '2023-07-20', 10, 11, 18),
# (55000000, '2021-01-30', 11, 9, 16),
# (35000000, '2022-02-28', 12, 12, 3),
# (47000000, '2023-03-25', 13, 14, 7),
# (52000000, '2020-11-12', 14, 15, 8),
# (92000000, '2021-09-19', 15, 16, 2),
# (100000000, '2023-05-17', 16, 13, 11),
# (48000000, '2022-04-30', 17, 18, 1),
# (63000000, '2020-08-10', 18, 17, 6),
# (70000000, '2021-12-11', 19, 5, 9),
# (35000000, '2023-06-15', 20, 10, 4),
# (40000000, '2022-10-20', 21, 7, 14),
# (75000000, '2020-03-05', 22, 8, 3),
# (85000000, '2021-07-25', 23, 9, 12),
# (92000000, '2023-08-08', 24, 6, 17),
# (58000000, '2022-11-01', 25, 12, 15),
# (69000000, '2020-04-18', 26, 4, 11),
# (46000000, '2023-09-12', 27, 2, 5),
# (61000000, '2021-02-21', 28, 16, 1),
# (30000000, '2022-06-09', 29, 11, 18),
# (77000000, '2023-07-30', 30, 14, 13);


