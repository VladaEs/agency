-- Run this only when visitor_visits was previously created with vv_ip VARBINARY(16).
-- Existing IPv4 and IPv6 values are converted to readable text before the binary
-- column is removed.

ALTER TABLE `visitor_visits`
    ADD COLUMN `vv_ip_text` varchar(45) CHARACTER SET ascii COLLATE ascii_bin DEFAULT NULL
    AFTER `vv_ip`;

UPDATE `visitor_visits`
SET `vv_ip_text` = INET6_NTOA(`vv_ip`);

ALTER TABLE `visitor_visits`
    DROP INDEX `visitor_ip_bucket_unique`,
    DROP COLUMN `vv_ip`,
    CHANGE COLUMN `vv_ip_text` `vv_ip`
        varchar(45) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    ADD UNIQUE KEY `visitor_ip_bucket_unique` (`vv_ip`, `vv_visit_bucket`);
