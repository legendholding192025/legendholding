-- Team members for the Leadership Team page.
-- Super admin manages via /admin/team-members.
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT 'Legend Holding Group',
  image TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'board' CHECK (category IN ('board', 'ksa', 'china')),
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  is_spotlight BOOLEAN DEFAULT false,
  seo_description TEXT DEFAULT '',
  linkedin TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_team_members_category ON team_members(category);
CREATE INDEX IF NOT EXISTS idx_team_members_sort ON team_members(sort_order);
CREATE INDEX IF NOT EXISTS idx_team_members_visible ON team_members(is_visible);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible team members"
  ON team_members FOR SELECT
  USING (is_visible = true);

CREATE POLICY "Admins can manage team members"
  ON team_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('super_admin', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('super_admin', 'admin')
    )
  );

-- Seed with existing team data (including SEO descriptions and spotlight flags)
INSERT INTO team_members (name, role, company, image, category, sort_order, is_spotlight, seo_description, linkedin) VALUES
  ('Kai Zheng', 'Founder & Chairman', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054607/image_5_xtngrn.jpg', 'board', 1, true, 'Kai Zheng, Co-founder and Chairman of Legend Holding Group, is an expert entrepreneur with extensive experience in developing companies and a clear vision for the future of technologies.', 'https://www.linkedin.com/in/kai-zheng-96087698/'),
  ('Mira Wu', 'Co-Founder & Vice Chairman', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1767593928/10_copy_2122_mssssq.png', 'board', 2, true, 'Mira Wu, Co-Founder and Vice Chairman of Legend Holding Group, is the executive leader of multiple businesses within the group, bringing over 20 years of experience across the region.', 'https://www.linkedin.com/in/mira-wu-7497001b2/'),
  ('Jonathan Stretton', 'Chief Operating Officer', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1767682094/Jonathan_r7nqeh.png', 'board', 3, false, 'Jonathan Stretton serves as Chief Operating Officer of Legend Holding Group, overseeing operational excellence across all business units.', ''),
  ('Cannon Wang', 'VP Dealership & Strategy of LHG', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054569/8_copy_wxobcr.jpg', 'board', 4, false, 'Cannon Wang leads as VP of Dealership & Strategy of Legend Holding Group, driving strategic growth across the automotive division.', 'https://www.linkedin.com/in/cannon-wang-55649b118/'),
  ('Rejeesh Raveendran', 'Group Finance Director', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1764740125/5_copy_lgomsk.png', 'board', 5, false, 'Rejeesh Raveendran, Group Finance Director at Legend Holding Group, has over 20 years of cross-industry experience and oversees the group''s financial management.', 'https://www.linkedin.com/in/rejeesh-r-pillai-820b4423b/'),
  ('Nagaraj Ponnada', 'General Manager', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054540/image_8_swwqoy.jpg', 'board', 6, false, 'Nagaraj Ponnada, General Manager of Legend Holding Group, has over 20 years of automotive experience across the region, managing sales, business development, and other key departments.', 'https://www.linkedin.com/in/nagarajforgrowth/'),
  ('Sonam Lama', 'Group HR Director', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1764143856/sonam_2_hpe4ou.png', 'board', 7, false, 'Sonam Lama leads human resources as Group HR Director at Legend Holding Group, overseeing talent acquisition and organizational development.', ''),
  ('Waseem Khalayleh', 'Head of Brand', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1763818241/WhatsApp_Image_2025-06-20_at_12.082222_asqhsk.png', 'board', 8, false, 'Waseem Khalayleh, Head of Brand at Legend Holding Group, with over 15 years of experience across industries from Automotive, Technology, Media and Group companies.', 'https://www.linkedin.com/in/waseem-khalayleh-96b8a780/'),
  ('Jade Li', 'Managing Director', 'Zul Energy', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1763817365/WhatsApp_Image_2025-06-20_at_12.08_1_ch0zex.png', 'board', 9, false, 'Jade Li serves as Managing Director of Zul Energy, leading the company''s sustainable energy initiatives and strategic growth.', ''),
  ('George Hua', 'Head of Commercial Vehicles', 'Legend Commercial Vehicles', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054559/3_copy_mxnwc7.jpg', 'board', 10, false, 'George Hua leads Legend Commercial Vehicles operations, bringing extensive expertise in commercial vehicle solutions and fleet management.', ''),
  ('Tamer Khalil', 'Head of After Sales', 'Legend Auto Services', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054567/4_copy_upgmzf.jpg', 'board', 11, false, 'Tamer Khalil leads After Sales services at Legend Auto Services, ensuring exceptional customer satisfaction and service quality.', ''),
  ('Sun Bo', 'Business Development Manager', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1766139126/02_3_whojcm.png', 'board', 12, false, 'Sun Bo leads Business Development initiatives at Legend Holding Group, driving new partnerships and market expansion.', ''),
  ('Pawan Rathi', 'General Manager', 'Legend Rent a Car', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1763818661/656_ynivxt.png', 'board', 13, false, 'Pawan Rathi serves as General Manager of Legend Rent a Car, overseeing the premium car rental services and operations across the UAE.', ''),
  ('Mohamed Baz', 'Head of Motorcycles', 'Legend Motorcycles', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1765196419/Mohammed_Baz_z7qv1o.png', 'board', 14, false, 'Mohamed Baz heads Motorcycles operations at Legend Motorcycles, managing the two-wheeler division and brand partnerships.', ''),
  ('Shameel Wohadally', 'Head of Internal Audit', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1767940725/Shameel_1_ylaowu.png', 'board', 15, false, 'Shameel Wohadally leads Internal Audit at Legend Holding Group, ensuring compliance, risk management, and governance across all divisions.', ''),
  ('Adrees Khan', 'Corporate Tax Manager', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1767787617/Adrees_nz1qnp.png', 'board', 16, false, 'Adrees Khan serves as Corporate Tax Manager at Legend Holding Group, overseeing tax compliance and fiscal strategy.', ''),
  ('Xiaolong Ma', 'Branch Manager', 'Legend Holding Group - KSA', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1765351058/5_copy55_ccgw0y.png', 'ksa', 1, false, 'Xiaolong Ma serves as Branch Manager for Legend Holding Group KSA operations, leading business growth in Saudi Arabia.', ''),
  ('Turki Altalhi', 'HR & Admin Manager', 'Legend Holding Group - KSA', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1766219042/turki_KSA_aupdzs.png', 'ksa', 2, false, 'Turki Altalhi manages HR and Administration for Legend Holding Group in Saudi Arabia, supporting the KSA expansion.', ''),
  ('Junfu Gao', 'General Manager of China Branch', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1764161813/4_copy_ukrn7s.png', 'china', 1, false, 'Junfu Gao serves as General Manager of Legend Holding Group''s China Branch, overseeing operations and partnerships in the Chinese market.', ''),
  ('Xiaoya Zhao', 'Deputy General Manager of China Branch', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1764144502/4_copy2_exbafg.png', 'china', 2, false, 'Xiaoya Zhao serves as Deputy General Manager of Legend Holding Group''s China Branch, supporting strategic initiatives and business development.', '')
ON CONFLICT DO NOTHING;
