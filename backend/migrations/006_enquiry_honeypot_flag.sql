ALTER TABLE `enquiries`
    ADD COLUMN `eq_is_honeypotted` tinyint(1) NOT NULL DEFAULT 0
    AFTER `eq_message`;
