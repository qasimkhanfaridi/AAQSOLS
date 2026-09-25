#!/usr/bin/env node
/**
 * AAQSOLS Financial & Project Management CLI
 * Tracks investments, expenses (kharcha), advances, partner balances, and projects.
 */

const fs = require('fs');
const path = require('path');

const LEDGER_PATH = path.join(__dirname, 'ledger.json');

function loadLedger() {
  if (!fs.existsSync(LEDGER_PATH)) {
    console.error(`Ledger file not found at: ${LEDGER_PATH}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
}

function saveLedger(data) {
  // Recompute summaries and partner balances
  recalculateLedger(data);
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function recalculateLedger(data) {
  let totalRevenue = 0;
  data.inflows.forEach(inf => {
    totalRevenue += (inf.amount || 0);
  });

  let officeCapex = 0;
  let adminSupplies = 0;
  let domainsOpex = 0;
  let totalExpenses = 0;

  const partnerSpent = { qasim: 0, asghar: 0, ali: 0 };
  const partnerReceived = { qasim: 0, asghar: 0, ali: 0 };

  data.expenses.forEach(exp => {
    const amt = exp.amount || 0;
    totalExpenses += amt;
    const cat = (exp.category || '').toLowerCase();
    if (cat.includes('domain')) {
      domainsOpex += amt;
    } else if (cat.includes('supplies') || cat.includes('legal') || cat.includes('cards') || cat.includes('branding') || cat.includes('comm') || cat.includes('util') || cat.includes('internet') || cat.includes('grocery') || cat.includes('food') || cat.includes('refreshment') || cat.includes('kitchen') || cat.includes('meal')) {
      adminSupplies += amt;
    } else {
      officeCapex += amt;
    }
    const payer = (exp.paid_by || '').toLowerCase();
    if (partnerSpent[payer] !== undefined) {
      partnerSpent[payer] += amt;
    } else {
      partnerSpent[payer] = amt;
    }
  });

  data.inflows.forEach(inf => {
    const rec = (inf.received_by || '').toLowerCase();
    const amt = inf.amount || 0;
    if (partnerReceived[rec] !== undefined) {
      partnerReceived[rec] += amt;
    } else {
      partnerReceived[rec] = amt;
    }
  });

  let pendingReceivables = 0;
  let pendingCommissions = 0;
  if (data.projects) {
    data.projects.forEach(p => {
      pendingReceivables += (p.pending_balance || 0);
      if (p.pending_balance > 0 && p.agent_commission) {
        pendingCommissions += p.agent_commission;
      }
    });
  }

  data.summary = {
    total_revenue_collected: totalRevenue,
    total_office_capex_spent: officeCapex,
    total_admin_supplies_spent: adminSupplies,
    total_domains_opex_spent: domainsOpex,
    total_expenses_spent: totalExpenses,
    net_operating_cash_deficit: totalRevenue - totalExpenses,
    pending_receivables_known: pendingReceivables,
    pending_agent_commissions: pendingCommissions,
    net_pending_income_known: pendingReceivables - pendingCommissions
  };

  data.partner_balances = {
    qasim: {
      total_spent: partnerSpent.qasim || 0,
      total_received: partnerReceived.qasim || 0,
      net_out_of_pocket_balance: (partnerReceived.qasim || 0) - (partnerSpent.qasim || 0),
      status: `Company owes Qasim PKR ${((partnerSpent.qasim || 0) - (partnerReceived.qasim || 0)).toLocaleString()} (Net unrecovered out-of-pocket)`
    },
    asghar: {
      total_spent: partnerSpent.asghar || 0,
      total_received: partnerReceived.asghar || 0,
      net_out_of_pocket_balance: (partnerReceived.asghar || 0) - (partnerSpent.asghar || 0),
      status: `Company owes Asghar PKR ${((partnerSpent.asghar || 0) - (partnerReceived.asghar || 0)).toLocaleString()} for domain investments`
    },
    ali: {
      total_spent: partnerSpent.ali || 0,
      total_received: partnerReceived.ali || 0,
      net_out_of_pocket_balance: (partnerReceived.ali || 0) - (partnerSpent.ali || 0),
      status: (partnerSpent.ali === 0 && partnerReceived.ali === 0) ? "Pending partner records" : "Active balance"
    }
  };
}

function printHeader(title) {
  console.log('\n' + '='.repeat(68));
  console.log(`  AAQSOLS FINANCE & PROJECT SYSTEM - ${title}`);
  console.log('='.repeat(68));
}

function showSummary() {
  const data = loadLedger();
  recalculateLedger(data);
  printHeader('FINANCIAL OVERVIEW (PKR)');

  console.log('\n[+] CASH FLOW & EXPENDITURE BREAKDOWN');
  console.log(`  Total Client Revenue Collected: PKR ${data.summary.total_revenue_collected.toLocaleString().padStart(9)} (Held by Qasim)`);
  console.log(`  Office Advance, Furniture, Capex: PKR ${data.summary.total_office_capex_spent.toLocaleString().padStart(9)}`);
  console.log(`  Admin, Legal, Cards & Supplies:   PKR ${data.summary.total_admin_supplies_spent.toLocaleString().padStart(9)}`);
  console.log(`  Domains & Digital Infrastructure: PKR ${data.summary.total_domains_opex_spent.toLocaleString().padStart(9)}`);
  console.log(`  ------------------------------------------------------------`);
  console.log(`  Total Company Kharcha (Spent):    PKR ${data.summary.total_expenses_spent.toLocaleString().padStart(9)}`);
  console.log(`  Net Startup Seed Deficit:         PKR ${data.summary.net_operating_cash_deficit.toLocaleString().padStart(9)}`);

  console.log('\n[+] PENDING RECEIVABLES & COMMISSIONS');
  console.log(`  Pending Client Inflows:       PKR ${data.summary.pending_receivables_known.toLocaleString().padStart(9)}`);
  console.log(`  Agent Commission Liability:  -PKR ${data.summary.pending_agent_commissions.toLocaleString().padStart(9)}`);
  console.log(`  ------------------------------------------------------------`);
  console.log(`  Net Pending Inflow to Firm:   PKR ${data.summary.net_pending_income_known.toLocaleString().padStart(9)}`);

  printHeader('PARTNER CAPITAL & SETTLEMENT LEDGER');
  for (const [key, p] of Object.entries(data.partner_balances)) {
    console.log(`\n* ${key.toUpperCase()}:`);
    console.log(`  - Out-of-pocket Spent: PKR ${p.total_spent.toLocaleString()}`);
    console.log(`  - Client Money Held:   PKR ${p.total_received.toLocaleString()}`);
    const net = p.total_spent - p.total_received;
    if (net > 0) {
      console.log(`  - Settlement Position: Company owes ${key.toUpperCase()} PKR ${net.toLocaleString()}`);
    } else if (net < 0) {
      console.log(`  - Settlement Position: ${key.toUpperCase()} holds company surplus PKR ${Math.abs(net).toLocaleString()}`);
    } else {
      console.log(`  - Settlement Position: Balanced / No record`);
    }
  }
  console.log('\n' + '='.repeat(68) + '\n');
}

function showProjects() {
  const data = loadLedger();
  printHeader('PROJECTS & CONTRACTS MATRIX');

  data.projects.forEach((proj, idx) => {
    console.log(`\n${idx + 1}. [${proj.id.toUpperCase()}] ${proj.name}`);
    console.log(`   Status:       ${proj.status}`);
    console.log(`   Repo:         ${proj.repo || 'None / Not linked'}`);
    if (proj.contract_value) {
      console.log(`   Contract:     PKR ${proj.contract_value.toLocaleString()} | Advance: PKR ${(proj.advance_received || 0).toLocaleString()} | Pending: PKR ${(proj.pending_balance || 0).toLocaleString()}`);
    } else {
      console.log(`   Contract:     Not fixed (${proj.contract_note || 'Milestone/Hourly/Retainer'}) | Received: PKR ${(proj.advance_received || 0).toLocaleString()}`);
    }
    if (proj.agent_commission) {
      console.log(`   Commission:   PKR ${proj.agent_commission.toLocaleString()} (${proj.agent_commission_terms})`);
    }
    if (proj.domain) {
      console.log(`   Domain:       ${proj.domain.name} | Cost: PKR ${proj.domain.cost} (Paid by: ${proj.domain.paid_by}) ${proj.domain.renewal_date ? '| Renew: ' + proj.domain.renewal_date : ''}`);
    }
    if (proj.account) {
      console.log(`   Account:      ${proj.account.email || 'N/A'} [Services: ${(proj.account.services || []).join(', ')}]`);
    }
  });
  console.log('\n' + '='.repeat(68) + '\n');
}

function addExpense(category, title, amount, paidBy, projectId) {
  const data = loadLedger();
  const id = 'EXP-' + String(data.expenses.length + 1).padStart(3, '0');
  const newExp = {
    id,
    category,
    title,
    amount: parseFloat(amount),
    paid_by: paidBy.toLowerCase(),
    payment_method: "Direct",
    project_id: projectId || null,
    date: new Date().toISOString().substring(0, 7)
  };
  data.expenses.push(newExp);
  saveLedger(data);
  console.log(`\n[OK] Added Expense ${id}: "${title}" of PKR ${amount} paid by ${paidBy}`);
  showSummary();
}

function addInflow(projectId, title, amount, receivedBy) {
  const data = loadLedger();
  const id = 'REV-' + String(data.inflows.length + 1).padStart(3, '0');
  const newInf = {
    id,
    project_id: projectId,
    title,
    amount: parseFloat(amount),
    received_by: receivedBy.toLowerCase(),
    date: new Date().toISOString().substring(0, 7)
  };
  data.inflows.push(newInf);

  // Update project advance_received if project exists
  const p = data.projects.find(x => x.id === projectId);
  if (p) {
    p.advance_received = (p.advance_received || 0) + parseFloat(amount);
    if (p.contract_value) {
      p.pending_balance = Math.max(0, p.contract_value - p.advance_received);
    }
  }

  saveLedger(data);
  console.log(`\n[OK] Added Inflow ${id}: "${title}" of PKR ${amount} received by ${receivedBy}`);
  showSummary();
}

// Command dispatcher
const args = process.argv.slice(2);
const command = args[0] || 'summary';

switch (command) {
  case 'summary':
    showSummary();
    break;
  case 'projects':
    showProjects();
    break;
  case 'add-expense':
    if (args.length < 5) {
      console.log('Usage: node aaqsols_finance.js add-expense <category> <title> <amount> <paid_by> [project_id]');
      process.exit(1);
    }
    addExpense(args[1], args[2], args[3], args[4], args[5]);
    break;
  case 'add-inflow':
    if (args.length < 5) {
      console.log('Usage: node aaqsols_finance.js add-inflow <project_id> <title> <amount> <received_by>');
      process.exit(1);
    }
    addInflow(args[1], args[2], args[3], args[4]);
    break;
  default:
    console.log(`Unknown command: ${command}`);
    console.log('Available commands: summary, projects, add-expense, add-inflow');
}
